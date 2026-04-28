let audioContext: AudioContext | null = null

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioContext) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return null
    audioContext = new Ctx()
  }
  return audioContext
}

// "はじめる" ボタン押下時に呼ぶ。iOS Safari の autoplay 制約を解除する。
export function initAudio(): void {
  const ctx = getContext()
  if (!ctx) return
  if (ctx.state === 'suspended') {
    ctx.resume()
  }
  // iOS Safari: ユーザー操作のコンテキスト内で無音バッファを再生してロック解除
  const buffer = ctx.createBuffer(1, 1, 22050)
  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.connect(ctx.destination)
  source.start(0)
}

function playTone(frequency: number, duration: number, volume: number): void {
  const ctx = getContext()
  if (!ctx) return

  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.type = 'sine'
  oscillator.frequency.value = frequency
  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  const now = ctx.currentTime
  gainNode.gain.setValueAtTime(0, now)
  gainNode.gain.linearRampToValueAtTime(volume, now + 0.02)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration)

  oscillator.start(now)
  oscillator.stop(now + duration)
}

// 切替音: 880Hz 単音 / 0.6秒 (warm → switching 遷移時)
export function playSwitchSound(): void {
  playTone(880, 0.6, 0.3)
}

// 完了音: 523Hz + 784Hz 和音 / 1.2秒 (cold → complete 遷移時)
export function playCompleteSound(): void {
  playTone(523, 1.2, 0.3)
  playTone(784, 1.2, 0.3)
}
