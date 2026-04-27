'use client'

import { useRouter } from 'next/navigation'

export default function CompletePhase() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9f7]">
      <p className="text-completion-message text-[#1a1c1b] text-center px-8">
        今日も、あなたは選んだ
      </p>
      <p className="font-sans text-label-sm text-[#444748] mt-sm">
        1日目
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
