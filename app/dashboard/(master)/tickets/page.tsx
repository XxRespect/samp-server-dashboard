import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
}
  from '@/components/ui/breadcrumb'


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

        <div className='grid grid-cols-3 gap-2'>
          <div className="bg-primary-foreground h-14"> </div>
          <div className="bg-primary-foreground"></div>
          <div className="bg-primary-foreground"></div>
        </div>
      </div>
    </>
  )
}

export default page