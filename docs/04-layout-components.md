# 04. レイアウト・共通コンポーネントの作成

## 概要

旧 `src/pug/layouts/default.pug` と共通コンポーネントを Astro コンポーネントとして再実装します。

---

## 移行対応表

| 旧ファイル | 新ファイル | 備考 |
|-----------|-----------|------|
| `src/pug/layouts/default.pug` | `src/layouts/BaseLayout.astro` | highlight.js 統合含む |
| レイアウト内のナビゲーション | `src/components/Navigation.astro` | 分離・独立コンポーネント化 |
| `.back-index` リンク | `src/components/BackIndex.astro` | 分離・独立コンポーネント化 |

---

## 手順

### 4-1. `BaseLayout.astro` の作成

**`src/layouts/BaseLayout.astro`**:

```astro
---
import '../styles/globals.css'
import Navigation from '../components/Navigation.astro'
import BackIndex from '../components/BackIndex.astro'

interface Props {
  title?: string
  showBackIndex?: boolean
}

const { title = 'モダン CSS の学習', showBackIndex = true } = Astro.props
---

<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,nofollow" />
    <title>{title}</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/a11y-dark.min.css"
    />
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
        <main class="main">
          <div class="block-content">
            <slot />
            {showBackIndex && <BackIndex />}
          </div>
        </main>
        <aside class="side">
          <Navigation />
        </aside>
      </div>
    </div>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"
    ></script>
    <script>hljs.highlightAll()</script>
  </body>
</html>

<style>
  .wrapper {
    max-width: 1200px;
    padding: 40px 15px;
    margin: auto;
  }

  .container {
    display: flex;
    gap: 80px;
    justify-content: space-between;
  }

  .main {
    flex: 1;
    min-width: 0;
  }

  .side {
    flex-shrink: 0;
    order: 1;
    width: 240px;
  }

  /* ブロックコンテンツのタイポグラフィ */
  .block-content :global(h1) {
    font-size: 2rem;
    font-weight: bold;
  }

  .block-content :global(h1)::before {
    margin-right: 0.4em;
    color: #319795;
    content: '#';
  }

  .block-content :global(h2) {
    margin: 2em 0 0;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .block-content :global(h2)::before {
    margin-right: 0.4em;
    color: #319795;
    content: '##';
  }

  .block-content :global(h3) {
    margin: 2em 0 0;
    font-size: 1.25rem;
    font-weight: bold;
  }

  .block-content :global(h3)::before {
    margin-right: 0.4em;
    color: #319795;
    content: '###';
  }

  .block-content :global(p) {
    margin: 1.6em 0;
    line-height: 1.8;
  }

  .block-content :global(p > code) {
    padding: 2px 4px;
    margin: 0 0.3em;
    font-size: 92.5%;
    background-color: #f7f7fc;
    border: 1px solid #ddd;
    border-radius: 3px;
  }

  .block-content :global(ul:not([class])),
  .block-content :global(ol:not([class])) {
    margin: 1.6em 0 0 1.6em;
  }

  .block-content :global(ul:not([class])) {
    list-style: disc;
  }

  .block-content :global(ol:not([class])) {
    list-style: decimal;
  }

  .block-content :global(:is(ul:not([class]), ol:not([class])) li) {
    list-style: inherit;
  }

  .block-content :global(:is(ul:not([class]), ol:not([class])) li + li) {
    margin-top: 0.2em;
  }

  .block-content :global(pre) {
    max-width: 100%;
    margin: 32px 0;
    overflow: auto;
    font-size: 0.875rem;
    border-radius: 8px;
  }

  .block-content :global(pre code.hljs) {
    padding: 1.6em;
  }

  /* サンプルオブジェクト共通スタイル */
  .block-content :global(.sample-object) {
    padding: 16px;
    margin: 32px 0;
    border: 1px solid #ddd;
    border-radius: 8px;
  }

  .block-content :global(.sample-object) :global(*) {
    padding: 0;
    margin: 0;
  }
</style>
```

> **注意**: highlight.js は CDN から読み込む方法と `npm install highlight.js` でインストールする方法があります。CDN を使用する場合は上記のとおり。npm を使う場合は `import hljs from 'highlight.js'` と `import 'highlight.js/styles/a11y-dark.min.css'` をスクリプト内で使用します。

---

### 4-2. `Navigation.astro` の作成

旧レイアウトのサイドバー部分を独立コンポーネントとして実装します。

**`src/components/Navigation.astro`**:

```astro
---
import articlesData from '../data/articles.json'

const { articles } = articlesData
const currentPath = Astro.url.pathname
---

<nav>
  <p class="logo">
    <a href="/">#</a>
  </p>
  <ul>
    {
      articles.map((article) => (
        <li>
          <a
            href={`/articles/${article.slug}`}
            class:list={[{ 'is-current': currentPath === `/articles/${article.slug}` }]}
          >
            {article.title}
          </a>
        </li>
      ))
    }
  </ul>
</nav>

<style>
  .logo {
    font-size: 3rem;
    font-weight: bold;
    margin: 0;

    a {
      color: #319795;
      text-decoration: none;
    }
  }

  ul {
    margin: 24px 0 0;
    font-size: 0.9375rem;
    line-height: 1.5;
    list-style: none;
    padding: 0;
  }

  li + li {
    margin-top: 2em;
  }

  a {
    font-weight: bold;
    color: #555;
    text-decoration: none;

    &:hover {
      color: #319795;
    }

    &.is-current {
      color: #319795;
    }
  }
</style>
```

---

### 4-3. `BackIndex.astro` の作成

**`src/components/BackIndex.astro`**:

```astro
---
---

<div class="back-index">
  <a href="/">トップへ戻る</a>
</div>

<style>
  .back-index {
    display: flex;
    justify-content: center;
    margin: 60px 0;
  }

  a {
    display: block;
    padding: 16px 32px;
    font-weight: bold;
    text-decoration: none;
    border: 2px solid #ddd;
    border-radius: 8px;
    color: inherit;

    &:hover {
      border-color: #319795;
      color: #319795;
    }
  }
</style>
```

---

## 完了条件

- [ ] `src/layouts/BaseLayout.astro` が作成されている
- [ ] `src/components/Navigation.astro` が作成されている
- [ ] `src/components/BackIndex.astro` が作成されている
- [ ] `articles.json` からナビゲーションリンクが動的に生成される
- [ ] highlight.js のシンタックスハイライトが機能する（記事ページ追加後に確認）

---

次のステップ: [05-home-page.md](./05-home-page.md)
