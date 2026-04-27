const KEYS = {
  hotDuration: 'plunge_hot_duration',
  coldDuration: 'plunge_cold_duration',
  streak: 'plunge_streak',
  lastCompletedDate: 'plunge_last_completed_date',
  recentMessages: 'plunge_recent_messages',
} as const

function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  const raw = localStorage.getItem(key)
  if (raw === null) return defaultValue
  try {
    return JSON.parse(raw) as T
  } catch {
    return defaultValue
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

export function getHotDuration(): number {
  return getItem<number>(KEYS.hotDuration, 180)
}

export function setHotDuration(seconds: number): void {
  setItem(KEYS.hotDuration, seconds)
}

export function getColdDuration(): number {
  return getItem<number>(KEYS.coldDuration, 30)
}

export function setColdDuration(seconds: number): void {
  setItem(KEYS.coldDuration, seconds)
}

export function getStreak(): number {
  return getItem<number>(KEYS.streak, 0)
}

export function setStreak(value: number): void {
  setItem(KEYS.streak, value)
}

export function getLastCompletedDate(): string {
  return getItem<string>(KEYS.lastCompletedDate, '')
}

export function setLastCompletedDate(date: string): void {
  setItem(KEYS.lastCompletedDate, date)
}

export function getRecentMessages(): number[] {
  return getItem<number[]>(KEYS.recentMessages, [])
}

export function setRecentMessages(indexes: number[]): void {
  setItem(KEYS.recentMessages, indexes)
}

function todayString(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function yesterdayString(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// セッション完了時に呼ぶ。ストリークを更新して新しい値を返す。
// 同日2回目以降は冪等(値変更なし)。
export function completeSession(): number {
  if (typeof window === 'undefined') return getStreak()

  const today = todayString()
  const last = getLastCompletedDate()

  if (last === today) {
    return getStreak()
  }

  const newStreak = last === yesterdayString() ? getStreak() + 1 : 1
  setStreak(newStreak)
  setLastCompletedDate(today)
  return newStreak
}
