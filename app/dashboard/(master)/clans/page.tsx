'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useQueryState } from 'nuqs'
import { DataTable } from './data-table'
import { getClans } from './clans.service'
import { useQuery } from '@tanstack/react-query'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Card,CardHeader,CardTitle,CardContent,CardDescription,CardFooter} 
from '@/components/ui/card'
import { Suspense } from 'react'

function ClansPage() {
  const [search, setSearch] = useQueryState('search', {
    defaultValue: ''
  })

  const [searchInput, setSearchInput] = useState(search)

  const [page, setPage] = useQueryState('page', {
    defaultValue: '1'
  })

  const [limit, setLimit] = useQueryState('limit', {
    defaultValue: '25'
  })


  const handleSearch = () => {
    setSearch(searchInput)
    setPage('1') // Reset to first page when searching
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }


  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", "page", "limit", search, page, limit],
    queryFn: () => getClans({
      search: search || "",
      page: page,
      limit: limit
    })
  })

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
              <BreadcrumbPage>Clans</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="m-6">
        <Card className='bg-primary-foreground'>
          <CardHeader><CardTitle><h1>Clans</h1></CardTitle></CardHeader>
          <div className=' m-4' >
            <Input
              placeholder="Search by Clan Name or CLAN ID"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-70 shadow-xl/30 hover:cursor-pointer hover:transition-all"
              onKeyPress={handleKeyPress}
            />
            <Button
              className='max-w-sm ml-3 shadow-xl/30 hover:cursor-pointer hover:transition-all'
              variant='outline'

            >
              Search
            </Button>
          </div>

          <DataTable data={data?.clans || []} columns={columns} />
        </Card>

      </div>
    </>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClansPage />
    </Suspense>
  )
}