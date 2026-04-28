let wakeLock: WakeLockSentinel | null = null

export function requestWakeLock(): void {
  if (typeof window === 'undefined') return
  if (!('wakeLock' in navigator)) return
  navigator.wakeLock
    .request('screen')
    .then(sentinel => {
      wakeLock = sentinel
    })
    .catch(() => {})
}

export function releaseWakeLock(): void {
  if (!wakeLock) return
  const sentinel = wakeLock
  wakeLock = null
  sentinel.release().catch(() => {})
}

// visibilitychange 時にタブが表示状態へ戻ったら再取得する。
// 戻り値はクリーンアップ関数。
export function setupVisibilityHandler(): () => void {
  if (typeof window === 'undefined') return () => {}

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      requestWakeLock()
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange)
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
}
