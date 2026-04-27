'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  getHotDuration,
  setHotDuration,
  getColdDuration,
  setColdDuration,
  getStreak,
} from '@/lib/storage'

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function Home() {
  const router = useRouter()
  const [hotDuration, setHotDurationState] = useState(180)
  const [coldDuration, setColdDurationState] = useState(30)
  const [streak, setStreakState] = useState(0)

  useEffect(() => {
    setHotDurationState(getHotDuration())
    setColdDurationState(getColdDuration())
    setStreakState(getStreak())
  }, [])

  function handleHotChange(value: number) {
    setHotDurationState(value)
    setHotDuration(value)
  }

  function handleColdChange(value: number) {
    setColdDurationState(value)
    setColdDuration(value)
  }

  return (
    <div
      className="bg-background text-foreground min-h-screen flex flex-col items-center justify-between pt-lg pb-xl"
      suppressHydrationWarning>

      {/* ロゴエリア */}
      <div className="flex flex-col items-center mb-xl">
        <h1 className="font-serif text-headline-lg">Plunge Lite</h1>
        <p className="font-sans text-label-sm text-foreground-muted mt-unit">
          温冷交代浴タイマー
        </p>
      </div>

      {/* 設定エリア */}
      <div className="w-full max-w-[28rem] px-safe-margin flex flex-col items-center gap-10">

        {/* 温水セクション */}
        <div className="w-full flex flex-col">
          <span className="font-sans text-label-sm text-left">温水</span>
          <div className="flex justify-center my-md">
            <span className="font-serif text-timer-display text-warm-accent">
              {formatDuration(hotDuration)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={600}
            step={10}
            value={hotDuration}
            onChange={(e) => handleHotChange(Number(e.target.value))}
            aria-label="温水時間"
            className="warm-slider w-full"
          />
          <div className="flex justify-between mt-xs">
            <span className="font-sans text-label-sm text-foreground-muted">0s</span>
            <span className="font-sans text-label-sm text-foreground-muted">10m</span>
          </div>
        </div>

        {/* 区切り線 */}
        <hr className="w-4/5 border-t border-divider" />

        {/* 冷水セクション */}
        <div className="w-full flex flex-col">
          <span className="font-sans text-label-sm text-left">冷水</span>
          <div className="flex justify-center my-md">
            <span className="font-serif text-timer-display text-cold-accent">
              {formatDuration(coldDuration)}
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={300}
            step={5}
            value={coldDuration}
            onChange={(e) => handleColdChange(Number(e.target.value))}
            aria-label="冷水時間"
            className="cold-slider w-full"
          />
          <div className="flex justify-between mt-xs">
            <span className="font-sans text-label-sm text-foreground-muted">10s</span>
            <span className="font-sans text-label-sm text-foreground-muted">5m</span>
          </div>
        </div>
      </div>

      {/* アクションエリア */}
      <div className="w-full max-w-[28rem] px-safe-margin flex flex-col items-center mt-xl">
        <button
          onClick={() => router.push('/timer')}
          className="w-4/5 h-12 border border-foreground text-foreground bg-transparent font-sans text-button-text hover:bg-surface-container-low transition-colors"
        >
          はじめる
        </button>
        <p className="font-sans text-label-sm text-foreground-muted mt-sm">
          連続 {streak} 日
        </p>
      </div>

    </div>
  )
}
