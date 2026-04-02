# 03. shadcn/ui のセットアップ

## 概要

Astro + React 環境に shadcn/ui をセットアップします。
shadcn/ui はホームページの記事カードなどのサイト UI に使用します（CSS デモ部分には使用しません）。

---

## 手順

### 3-1. shadcn/ui の初期化

```bash
npx shadcn@latest init
```

対話式プロンプトには以下のように回答します:

| 質問 | 回答 |
|------|------|
| Which style would you like to use? | `default` |
| Which color would you like to use as base color? | `Slate`（後から変更可能） |
| Where is your global CSS file? | `src/styles/globals.css` |
| Would you like to use CSS variables for colors? | `yes` |
| Where is your tailwind.config.* located? | （自動検出される） |
| Configure the import alias for components | `@/components` |
| Configure the import alias for utils | `@/lib/utils` |
| Are you using React Server Components? | `no` |

---

### 3-2. `components.json` の確認

初期化後、プロジェクトルートに `components.json` が生成されます。内容を確認します:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

---

### 3-3. `src/lib/utils.ts` の確認

shadcn/ui の初期化により `src/lib/utils.ts` が生成されます。内容を確認します:

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

生成されていない場合は手動で作成し、必要なパッケージをインストールします:

```bash
npm install clsx tailwind-merge
```

---

### 3-4. `Card` コンポーネントの追加

ホームページの記事一覧カードに使用する `Card` コンポーネントを追加します:

```bash
npx shadcn@latest add card
```

`src/components/ui/card.tsx` が生成されます。

---

### 3-5. `globals.css` への CSS 変数追加

shadcn/ui の初期化により `globals.css` に CSS 変数が追加されます。
既存の `globals.css` と重複する場合は整理します。

最終的な `globals.css` の構造:

```css
@import "tailwindcss";

@layer base {
  :root {
    /* shadcn/ui のカラートークン */
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.145 0 0);
    --primary: oklch(0.205 0 0);
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.556 0 0);
    --accent: oklch(0.97 0 0);
    --accent-foreground: oklch(0.205 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: oklch(0.708 0 0);
    --radius: 0.625rem;

    /* サイト固有のカラートークン */
    --color-teal: #319795;
    --color-main: #c8133e;
    --color-text: #333;
    --font-sans: "Open Sans", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",
      sans-serif;
    --font-mono: Menlo, Monaco, "Bitstream Vera Sans Mono", "Lucida Console",
      Consolas, Courier, monospace;
  }

  .dark {
    /* ダークモードが必要な場合はここに追記 */
  }
}
```

---

### 3-6. `tsconfig.json` のパスエイリアス確認

shadcn/ui は `@/` エイリアスを使用します。`tsconfig.json` に設定されているか確認します:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 完了条件

- [ ] `npx shadcn@latest init` が正常に完了している
- [ ] `components.json` が生成されている
- [ ] `src/lib/utils.ts` が存在し、`cn()` 関数が定義されている
- [ ] `src/components/ui/card.tsx` が生成されている
- [ ] `src/styles/globals.css` に shadcn/ui の CSS 変数が含まれている
- [ ] `tsconfig.json` に `@/*` パスエイリアスが設定されている

---

次のステップ: [04-layout-components.md](./04-layout-components.md)
