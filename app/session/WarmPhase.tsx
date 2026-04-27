'use client'

interface Props {
  remaining: number
  onAbort: () => void
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export default function WarmPhase({ remaining, onAbort }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9f7]">
      <span className="font-sans text-label-sm tracking-widest text-[#d97757] mb-md">
        温水
      </span>
      <span className="text-timer-display-large text-[#1a1c1b]">
        {formatTime(remaining)}
      </span>
      <button
        onClick={onAbort}
        className="font-sans text-button-text text-[#1a1c1b] border-b border-[#1a1c1b] mt-xl bg-transparent cursor-pointer pb-0.5"
      >
        中止
      </button>
    </div>
  )
}
