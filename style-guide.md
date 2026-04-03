---
name: MyNoway 網站風格與配色
description: MyNoway 官網的設計風格、色票、字型，以及 Ariel 的設計偏好
type: project
---

# MyNoway 網站風格

## 色票

| 變數 | 色碼 | 用途 |
|------|------|------|
| `--black` | `#2c1f1a` | 主文字、深色背景 |
| `--white` | `#fffdf9` | 頁面底色（帶暖調） |
| `--gray-50` | `#fdf6f0` | 區塊背景 |
| `--gray-100` | `#f5ebe2` | 標籤背景 |
| `--gray-200` | `#e8d5c8` | 邊框、分隔線 |
| `--gray-400` | `#b89f94` | 次要文字 |
| `--gray-600` | `#7a6460` | 說明文字 |
| `--accent` | `#c07b74` | 主要強調色（玫瑰粉） |
| `--accent-light` | `#d9a49e` | 淺版強調色 |
| `--accent-dark` | `#a05850` | 深版強調色 |

## 漸層
- Hero 背景：`linear-gradient(160deg, #fffdf9 0%, #fdf0ea 45%, #fce8e6 100%)`
- Footer / CTA 背景：`linear-gradient(135deg, #c87b72, #a05850)`

## 字型
- **Inter**（Google Fonts），weights: 300, 400, 500, 600, 700, 800
- 標題：font-weight 800，letter-spacing -0.03em ~ -0.04em
- 整體偏暖色調、柔和質感

## Ariel 的設計偏好

- **不顯示價格**：希望客戶看到服務內容後直接來填表詢價，避免客戶因價格自我篩選
- **去掉分層方案**：客群以中小企業為主，不需要多個方案卡，改成單一詢價區塊更乾淨
- **簡潔勝於複雜**：偏好聚焦、行動明確的版面，不堆疊過多資訊
- **表單用 Notion Forms 嵌入**：嵌入碼為官方提供，`/ebd/` 路徑格式
- **CTA 漸層色（#c87b72 → #a05850）**：喜歡這個暖玫瑰漸層，曾用於 Footer
