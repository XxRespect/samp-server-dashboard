'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Field,
  FieldLabel,
} from '@/components/ui/field'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"


import { redirect } from 'next/navigation'

import { formatTime } from '@/utils/datatime/datetime.formater'
import { convertTimestampToDate } from '@/utils/datatime/timestamp.converter'

import { useSession } from "next-auth/react";


import { useQuery } from '@tanstack/react-query'
import { trpc } from '@/utils/trpc'

export default function BanAppealPage() {


    const { data: session }  = useSession()

    if(session?.user?.BANNED != 1) {
      alert("Voce nao esta banido")
     return redirect("/dashboard/support")
    }


    const { data } = useQuery({
        queryKey: ['banAppeal', session?.user.id],
        queryFn: () => trpc.tickets.getBanInfo.query({ userid: session?.user.id as number }),
        enabled: !!session?.user?.id
    })


    function remainTime() {
      const Time = new Date()
      const BanTime = data?.desban as number
      const RemainingTime = BanTime - Time.getTime()
      return convertTimestampToDate(RemainingTime)
    }

    console.log(data)
  return (
    <>
      <div className="pt-6 pb-8 m-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/support">Home</BreadcrumbLink>
            </BreadcrumbItem>
             <BreadcrumbSeparator />
             <BreadcrumbPage>Ban Appeal</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <main className="m-3 shadow-lg">
        <section className="m-3">
            <h1>Revisao de banimento</h1>
            <p>Está pagina é dedicada a criacao de revisoes de banimento in game <br/> Voce nao precisa adicionar informacoes extra tipo quem baniu
            o sistema faz isso automaticamente</p>
        </section>
        <section className="grid grid-cols-2 w-70">
            
            <span>Admin</span>
            <span>{data?.adm}</span>

            <span>Nick</span>
            <span>{data?.Nick}</span>

            <span>Motivo</span>
            <span>{data?.motivo}</span>

            <span>Tipo</span>
            <span>{data?.ban === 1 ? 'Permanente' : 'Temporario'}</span>
            
            {data?.ban && data?.ban > 0 && (
                <>
                
                    <span>Tempo restante</span>
                    <span>{remainTime()}</span>
                </>
            )}

            <span>Data</span>
            <span>{formatTime(data?.data)}</span>

        </section>
        <section className="mt-4 m-90 ml-auto">
            <Field className=''>
                <FieldLabel htmlFor="block-end-textarea">Comentario ou contra provas   
                </FieldLabel>

            </Field>
            <InputGroup>
            <InputGroupTextarea
            id='block-end-text-area'
            placeholder="Write a comment"
            />

            <InputGroupAddon  align='block-end'>
                <InputGroupButton variant='default' size='sm' className="ml-auto">
                Create</InputGroupButton>
            </InputGroupAddon>
            </InputGroup>
        </section>
      </main>
    </>
  );
};
