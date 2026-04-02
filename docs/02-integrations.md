# 02. React・Tailwind CSS・Biome のセットアップ

## 概要

Astro の integrations として React と Tailwind CSS を追加し、Biome でコード品質管理を設定します。

---

## 手順

### 2-1. React インテグレーションの追加

```bash
npx astro add react
```

> 途中で確認プロンプトが出たらすべて `y` を選択します。

完了後、`astro.config.mjs` に React が追加されていることを確認します:

```js
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

export default defineConfig({
  output: 'static',
  integrations: [react()],
})
```

---

### 2-2. Tailwind CSS インテグレーションの追加

```bash
npx astro add tailwind
```

> 途中で確認プロンプトが出たらすべて `y` を選択します。

完了後、`astro.config.mjs` に Tailwind が追加されていることを確認します:

```js
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  output: 'static',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
})
```

> `applyBaseStyles: false` は shadcn/ui との競合を避けるために必要です。

---

### 2-3. グローバル CSS の作成

**`src/styles/globals.css`** を作成します:

```css
@import "tailwindcss";

@layer base {
  :root {
    /* カラートークン */
    --color-main: #c8133e;
    --color-sub: #7ec1ea;
    --color-teal: #319795;
    --color-text: #333;
    --color-link: #319795;
    --color-gray: #f3f3f3;
    --color-border: #ddd;

    /* フォントファミリー */
    --font-sans: "Open Sans", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",
      sans-serif;
    --font-mono: Menlo, Monaco, "Bitstream Vera Sans Mono", "Lucida Console",
      Consolas, Courier, monospace;
  }
}

@layer base {
  html {
    font-family: var(--font-sans);
    word-break: break-word;
    overflow-wrap: break-word;
    tab-size: 4;
    text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    @apply text-[#333] bg-white;
  }

  pre,
  code {
    font-family: var(--font-mono);
  }

  img,
  svg {
    max-width: 100%;
    vertical-align: bottom;
  }

  a {
    color: var(--color-link);
    text-decoration: underline;

    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
    }
  }
}
```

---

### 2-4. Biome のインストールと初期化

```bash
npm install --save-dev @biomejs/biome
npx biome init
```

---

### 2-5. `biome.json` の設定

生成された `biome.json` を以下のように編集します:

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded",
      "trailingCommas": "es5"
    }
  },
  "files": {
    "ignore": [
      "dist/**",
      ".astro/**",
      "node_modules/**"
    ]
  }
}
```

---

### 2-6. VSCode 設定の更新（任意）

`.vscode/settings.json` に以下を追加すると、保存時に Biome が自動実行されます:

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "[astro]": {
    "editor.defaultFormatter": "astro-build.astro-vscode"
  }
}
```

> Biome の VSCode 拡張機能（`biomejs.biome`）と Astro 拡張機能（`astro-build.astro-vscode`）をインストールしておいてください。

---

### 2-7. 動作確認

この時点でサーバーが起動できるか確認します。

```bash
npm run dev
```

まだページがないため画面は空ですが、エラーなく起動すれば OK です。

---

## 完了条件

- [ ] `@astrojs/react` がインストールされ、`astro.config.mjs` に追加されている
- [ ] `@astrojs/tailwind` がインストールされ、`astro.config.mjs` に追加されている（`applyBaseStyles: false`）
- [ ] `src/styles/globals.css` が作成されている
- [ ] `@biomejs/biome` がインストールされ、`biome.json` が設定されている
- [ ] `npm run dev` でエラーなく起動する

---

次のステップ: [03-shadcn-setup.md](./03-shadcn-setup.md)
