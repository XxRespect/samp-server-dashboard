'use client'


import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'



export default function AdminsPage() {
  const { data: session } = useSession()
  const [admins, setAdmins] = useState([])
  
  return (
    <>
      <main className='h-screen'>
        <h1>Admins</h1>
      </main>
    </>
  )
}