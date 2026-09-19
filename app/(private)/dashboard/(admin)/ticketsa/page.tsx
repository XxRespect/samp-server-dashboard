
'use client'

import { Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink,
   BreadcrumbList,
    BreadcrumbPage, 
    BreadcrumbSeparator 
  } from '@/components/ui/breadcrumb'


import { useQueryState } from 'nuqs'



function page() {

  


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
                <BreadcrumbPage>Tickets</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>

        </div>
    </>
  )
}

export default page