'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { trpc } from '@/trpc/client'
import { PropertiesTable } from './columns'



function Page() {
  const { data, isLoading, error } = trpc.getProperties.useQuery()

  if (isLoading) return <div>Carregando propriedades...</div>
  if (error) return <div>Erro ao carregar propriedades: {error.message}</div>

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
