'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getHotDuration, getColdDuration } from '@/lib/storage'
import { playSwitchSound, playCompleteSound } from '@/lib/sound'
import { requestWakeLock, releaseWakeLock, setupVisibilityHandler } from '@/lib/wakeLock'
import WarmPhase from './WarmPhase'
import SwitchingPhase from './SwitchingPhase'
import ColdPhase from './ColdPhase'
import CompletePhase from './CompletePhase'

type Phase = 'warm' | 'switching' | 'cold' | 'complete'

function phaseDuration(phase: Phase): number {
  if (phase === 'warm') return getHotDuration()
  if (phase === 'switching') return 3
  if (phase === 'cold') return getColdDuration()
  return 0
}

function nextPhase(phase: Phase): Phase {
  if (phase === 'warm') return 'switching'
  if (phase === 'switching') return 'cold'
  if (phase === 'cold') return 'complete'
  return 'complete'
}

export default function SessionPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('warm')
  const [remaining, setRemaining] = useState<number>(0)

  useEffect(() => {
    if (phase === 'complete') return

    const duration = phaseDuration(phase)
    setRemaining(duration)

    const intervalId = setInterval(() => {
      setRemaining(prev => Math.max(0, prev - 1))
    }, 1000)

    const timeoutId = setTimeout(() => {
      setPhase(nextPhase(phase))
    }, duration * 1000)

    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [phase])

  // Wake Lock: セッション開始時に取得、unmount 時に解放
  useEffect(() => {
    requestWakeLock()
    const cleanupVisibility = setupVisibilityHandler()
    return () => {
      releaseWakeLock()
      cleanupVisibility()
    }
  }, [])

  // 音 + 完了時の Wake Lock 解放
  useEffect(() => {
    if (phase === 'switching') playSwitchSound()
    if (phase === 'complete') {
      playCompleteSound()
      releaseWakeLock()
    }
  }, [phase])

  const handleAbort = () => {
    releaseWakeLock()
    router.push('/')
  }

  if (phase === 'warm') return <WarmPhase remaining={remaining} onAbort={handleAbort} />
  if (phase === 'switching') return <SwitchingPhase />
  if (phase === 'cold') return <ColdPhase remaining={remaining} onAbort={handleAbort} />
  return <CompletePhase />
}
