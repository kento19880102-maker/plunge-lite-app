/**
 * アプリ用アイコンを生成する。
 * 実行: node scripts/generate-icons.mjs
 * 依存: sharp (Next.js が内包)
 */
import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '../public')

// アプリ用 SVG (背景を #f9f9f7 に変更、512x512 ベース)
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="60" fill="#f9f9f7"/>
  <text
    x="256"
    y="390"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="380"
    font-weight="700"
    fill="#1a1c1b"
    text-anchor="middle"
  >P</text>
</svg>`

const svgBuffer = Buffer.from(svgContent)

const targets = [
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
  { file: 'apple-icon.png', size: 180 },
]

for (const { file, size } of targets) {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(resolve(publicDir, file))
  console.log(`✓ public/${file}`)
}

writeFileSync(resolve(publicDir, 'icon.svg'), svgContent, 'utf-8')
console.log('✓ public/icon.svg')
console.log('アイコン生成完了')
