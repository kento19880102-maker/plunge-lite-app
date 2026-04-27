'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { completeSession } from '@/lib/storage'
import { getRandomMessage } from '@/lib/messages'

export default function CompletePhase() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [streak, setStreak] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const newStreak = completeSession()
    const msg = getRandomMessage()
    setStreak(newStreak)
    setMessage(msg)
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <div className="min-h-screen bg-[#f9f9f7]" />
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9f7]">
      <p className="text-completion-message text-[#1a1c1b] text-center px-8">
        {message}
      </p>
      <p className="font-sans text-label-sm text-[#444748] mt-sm">
        {streak}日目
      </p>
      <button
        onClick={() => router.push('/')}
        className="font-sans text-button-text text-[#1a1c1b] border-b border-[#1a1c1b] mt-xl bg-transparent cursor-pointer pb-0.5"
      >
        もどる
      </button>
    </div>
  )
}
