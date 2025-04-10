'use client'

import { useEffect } from 'react'
import { passportInstance } from '@/config/passport'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await passportInstance.logout()
        router.push('/')
      } catch (error) {
        console.error('Logout failed:', error)
        router.push('/')
      }
    }

    handleLogout()
  }, [router])

  return (
    <div className="pages">
      <h1>Logging out...</h1>
    </div>
  )
} 