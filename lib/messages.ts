export const COMPLETE_MESSAGES = [
  '今日も、あなたは選んだ',
  '目覚めた',
  '整った',
  'ぬるさを、手放した',
  '静かに、始まる',
  '朝を、掴んだ',
  '一日が、澄んでいる',
  '体が、覚えている',
  '今、ここにいる',
  '選んだ者の朝',
] as const

const LAST_MESSAGE_KEY = 'plunge-lite:last-message-index'

export function getRandomMessage(): string {
  if (typeof window === 'undefined') return COMPLETE_MESSAGES[0]

  const lastIndexStr = localStorage.getItem(LAST_MESSAGE_KEY)
  const lastIndex = lastIndexStr !== null ? parseInt(lastIndexStr, 10) : -1

  let nextIndex: number
  if (lastIndex < 0 || COMPLETE_MESSAGES.length <= 1) {
    nextIndex = Math.floor(Math.random() * COMPLETE_MESSAGES.length)
  } else {
    nextIndex = Math.floor(Math.random() * (COMPLETE_MESSAGES.length - 1))
    if (nextIndex >= lastIndex) nextIndex += 1
  }

  localStorage.setItem(LAST_MESSAGE_KEY, String(nextIndex))
  return COMPLETE_MESSAGES[nextIndex]
}
