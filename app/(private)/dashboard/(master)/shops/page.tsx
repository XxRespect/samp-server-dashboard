'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { trpc } from '@/utils/trpc'

function ShopsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['player', 1],
    queryFn: () => trpc.player.getPlayer.query({ id: 1 }),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {(error as Error).message}</div>

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <div>No player found</div>}
    </div>
  )
}

export default ShopsPage