# 05. ホームページの作成

## 概要

旧 `src/pug/pages/index.pug` を `src/pages/index.astro` として再実装します。
記事一覧は shadcn/ui の `Card` コンポーネントを使用します。

---

## 移行対応

**旧コード（Pug）:**
```pug
extends /layouts/default

block content
  h1 モダン CSS の学習 〜今はこう書けますよ〜

  ul.home-index
    each post in SHEETS.articles
      li
        a(href=`/articles/${post.slug}.html`)
          h2 #{ post.title }
          p #{ post.description }

block back
```

**新コード（Astro）:** 下記参照

---

## 手順

### 5-1. `src/pages/index.astro` の作成

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import articlesData from '../data/articles.json'

const { articles } = articlesData
---

<BaseLayout title="モダン CSS の学習" showBackIndex={false}>
  <h1>モダン CSS の学習 〜今はこう書けますよ〜</h1>

  <ul class="home-index">
    {
      articles.map((article) => (
        <li>
          <a href={`/articles/${article.slug}`}>
            <Card className="h-full transition-colors hover:border-[#319795]">
              <CardHeader>
                <CardTitle className="text-[#319795] text-base">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {article.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </a>
        </li>
      ))
    }
  </ul>
</BaseLayout>

<style>
  h1 {
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.4;
  }

  h1::before {
    content: none;
  }

  .home-index {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    padding: 0;
    margin: 32px 0 0;
    list-style: none;

    li {
      display: flex;
      width: calc((100% - 24px) / 2);
    }

    a {
      display: block;
      width: 100%;
      text-decoration: none;
      color: inherit;
    }
  }
</style>
```

> **注意**: `BaseLayout` に `showBackIndex={false}` を渡すことで、ホームページではトップへ戻るリンクを非表示にします。

---

### 5-2. レスポンシブ対応（任意）

モバイル幅（767px 以下）で 1 カラムに切り替える場合は、`<style>` に以下を追加します:

```css
@media (max-width: 767px) {
  .home-index li {
    width: 100%;
  }
}
```

---

### 5-3. 動作確認

```bash
npm run dev
```

ブラウザで `http://localhost:4321/` を開き、以下を確認します:

- [ ] ページタイトルが「モダン CSS の学習 〜今はこう書けますよ〜」で表示される
- [ ] 11 記事のカードが 2 カラムで表示される
- [ ] 各カードをクリックすると `/articles/{slug}` に遷移しようとする（まだ 404）
- [ ] サイドバーに記事一覧ナビゲーションが表示される
- [ ] ロゴ `#` をクリックするとホームページに戻る

---

## 完了条件

- [ ] `src/pages/index.astro` が作成されている
- [ ] `articles.json` の 11 記事すべてがカードとして表示される
- [ ] ホームページにトップへ戻るリンクが**表示されない**
- [ ] shadcn/ui の `Card` コンポーネントが正常に描画される

---

次のステップ: [06-article-pages.md](./06-article-pages.md)
