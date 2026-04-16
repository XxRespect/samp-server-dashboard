'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { useQuery } from '@tanstack/react-query'
import { trpc } from '@/utils/trpc'
import { PropertiesTable } from './columns'



function Page() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: () => trpc.getProperties.query(),
  })

  if (isLoading) return <div>Carregando propriedades...</div>
  if (error) return <div>Erro ao carregar propriedades: {(error as Error).message}</div>

  return (
    <>
      <div>
        <Breadcrumb className='m-5'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Properties</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <main>
        <PropertiesTable data={data || []} />
      </main>
    </>
  )
}

export default Page