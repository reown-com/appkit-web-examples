'use client'

import { useEffect } from 'react'
import { passportInstance } from '@/config/passport'
import { useRouter } from 'next/navigation'

export default function RedirectPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await passportInstance.loginCallback()
        router.push('/')
      } catch (error) {
        console.error('Login callback failed:', error)
        router.push('/')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="pages">
      <h1>Completing login...</h1>
    </div>
  )
} 