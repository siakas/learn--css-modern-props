# 06. 記事ページの作成（11 ページ）

## 概要

11 本の記事ページを Astro コンポーネントとして実装します。
各ページの CSS デモ（`.sample-object` 内）は Tailwind ではなく、各ページの `<style>` タグ（Astro スコープ CSS）に記述します。

---

## 共通パターン

各記事ページは以下の構造を持ちます:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro'
---

<BaseLayout title="記事タイトル">
  <h1>記事タイトル</h1>

  <!-- 本文 -->
  <p>...</p>

  <!-- CSS デモ -->
  <div class="sample-object">
    <!-- デモ HTML -->
  </div>

  <!-- コードブロック -->
  <pre><code class="language-scss">...</code></pre>
</BaseLayout>

<style>
  /* CSS デモ用スタイル（Astro スコープ） */
  .sample-object { ... }
</style>
```

---

## 各記事の実装

### 6-1. `gap.astro`

**ファイルパス**: `src/pages/articles/gap.astro`

**元ファイル**: `src/pug/pages/articles/gap.pug`

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro'
---

<BaseLayout title="Flexbox の余白調整">
  <h1>Flexbox の余白調整</h1>

  <p>
    CSS Grid だけでなく、Flexbox における子要素間の余白も
    <code>gap</code> を使うと、非常に楽に設定することができます。
  </p>

  <p>
    <code>gap</code> プロパティは IE で利用することができなかったため、同じく IE
    でまともに利用できない CSS Grid と合わせて紹介されることが多く、そのため CSS
    Grid 専用のプロパティと思われがちですが、実は Flexbox でも利用できるプロパティです。
  </p>

  <h2>これまでは</h2>

  <p>
    これまでは Flexbox の余白調整は子要素にマージンを持たせ、親要素のネガティブマージンなどと合わせて利用していました。
  </p>

  <div class="sample-object">
    <div class="old-flex">
      <div class="obj"></div>
      <div class="obj"></div>
      <div class="obj"></div>
    </div>
  </div>

  <pre><code class="language-html">&lt;div class="flex"&gt;
  &lt;div class="obj"&gt;&lt;/div&gt;
  &lt;div class="obj"&gt;&lt;/div&gt;
  &lt;div class="obj"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>

  <pre><code class="language-scss">.flex &#123;
  display: flex;
  margin: auto -8px;

  .obj &#123;
    width: calc((100% - (16px * 3)) / 3);
    height: 100px;
    margin: 0 8px;
  &#125;
&#125;</code></pre>

  <h2>今はこう書ける</h2>

  <p>
    <code>gap</code> を使うことで余白指定がシンプルになるだけでなく、ネガティブマージンの計算が不要になるため、スタイルを変更することなく列数を柔軟に変更することができます。
  </p>

  <div class="sample-object">
    <div class="new-flex">
      <div class="obj"></div>
      <div class="obj"></div>
      <div class="obj"></div>
    </div>
    <div class="new-flex">
      <div class="obj"></div>
      <div class="obj"></div>
      <div class="obj"></div>
      <div class="obj"></div>
    </div>
  </div>

  <pre><code class="language-scss">.flex &#123;
  display: flex;
  gap: 16px;

  .obj &#123;
    flex: 1;
    height: 100px;
  &#125;
&#125;</code></pre>

  <h3>gap プロパティはショートハンド</h3>

  <p>
    <code>gap</code> プロパティは <code>row-gap</code> と <code>column-gap</code>
    のショートハンド（一括指定）プロパティなので、値を 1
    つ指定した場合は行間と列間（上下左右）、値を 2
    つ指定した場合は行間（上下）と列間（左右）に対する余白をそれぞれ指定することができます。
  </p>

  <div class="sample-object">
    <div class="new-flex-wrap">
      <div class="obj"></div>
      <div class="obj"></div>
      <div class="obj"></div>
      <div class="obj"></div>
      <div class="obj"></div>
      <div class="obj"></div>
    </div>
  </div>

  <pre><code class="language-scss">.flex &#123;
  display: flex;
  gap: 32px 16px; // 1つめの値が行間（上下）、2つめの値が列間（左右）に対する余白指定となります
&#125;</code></pre>
</BaseLayout>

<style>
  .old-flex {
    display: flex;
    margin: auto -8px;

    .obj {
      width: calc((100% - (16px * 3)) / 3);
      height: 100px;
      margin: 0 8px;
      background-color: #c00;
    }
  }

  .new-flex {
    display: flex;
    gap: 16px;

    & + .new-flex {
      margin-top: 16px;
    }

    .obj {
      flex: 1;
      height: 100px;
      background-color: #09c;
    }
  }

  .new-flex-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 32px 16px;

    .obj {
      flex-grow: 1;
      width: 30%;
      height: 100px;
      background-color: #09c;
    }
  }
</style>
```

---

### 6-2. `place-items.astro`

**ファイルパス**: `src/pages/articles/place-items.astro`

**元ファイル**: `src/pug/pages/articles/place-items.pug`

> コンテンツは元の Pug ファイルから HTML に変換します。`.sample-object` 内のデモ（`.container1`、`.circle`、`.circle2`、`.circle3`）は元の SCSS スタイルを `<style>` タグに記述します。

主な `<style>` の内容:

```css
.container1 {
  position: relative;
  height: 300px;
}
.container1 .box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background: #c00;
  transform: translate(-50%, -50%);
}
.circle, .circle2, .circle3 {
  width: 48px;
  height: 48px;
  margin: auto;
  background-color: #2e2e48;
  border-radius: 50%;
}
/* ... 以下は元の SCSS から変換 */
```

---

### 6-3. `inset.astro`

**ファイルパス**: `src/pages/articles/inset.astro`

**元ファイル**: `src/pug/pages/articles/inset.pug`

> `.image1`、`.image2` のデモに `https://picsum.photos` の外部画像と `public/assets/img/play.svg` を使用します。

---

### 6-4. `aspectratio-objectfit.astro`

**ファイルパス**: `src/pages/articles/aspectratio-objectfit.astro`

**元ファイル**: `src/pug/pages/articles/aspectratio-objectfit.pug`

> `.card-sample1`（background-image 方式）と `.card-sample2`（img + aspect-ratio 方式）、`.card-sample3`（各種アスペクト比）のデモを実装します。

---

### 6-5. `clamp.astro`

**ファイルパス**: `src/pages/articles/clamp.astro`

**元ファイル**: `src/pug/pages/articles/clamp.pug`

> `.old-box`、`.new-box`、`.text` のデモを実装します。外部リンク（Min-Max-Value Interpolation）も含みます。

---

### 6-6. `margin.astro`

**ファイルパス**: `src/pages/articles/margin.astro`

**元ファイル**: `src/pug/pages/articles/margin.pug`

> `.box`（`margin: 0 auto`）と `.box2`（`margin: auto`）のデモを実装します。

---

### 6-7. `display-none.astro`

**ファイルパス**: `src/pages/articles/display-none.astro`

**元ファイル**: `src/pug/pages/articles/display-none.pug`

> このページのみ JavaScript が必要です。2 つのトグルデモ（`#target1`/`#target2`）を実装します。

`<script>` タグをページ末尾に追加:

```astro
<script>
  // デモ 1: display: block/none による切り替え
  const target1 = document.getElementById('target1')
  document.getElementById('show1')?.addEventListener('click', () => {
    target1?.classList.add('is-active')
  })
  document.getElementById('hide1')?.addEventListener('click', () => {
    target1?.classList.remove('is-active')
  })

  // デモ 2: :not() による切り替え
  const target2 = document.getElementById('target2')
  document.getElementById('show2')?.addEventListener('click', () => {
    target2?.classList.add('is-active')
  })
  document.getElementById('hide2')?.addEventListener('click', () => {
    target2?.classList.remove('is-active')
  })
</script>
```

---

### 6-8. `text-align-last.astro`

**ファイルパス**: `src/pages/articles/text-align-last.astro`

**元ファイル**: `src/pug/pages/articles/text-align-last.pug`

> テーブルのデモを実装します。全角スペースを使ったセルと `text-align-last: justify` を使ったセルの比較。

---

### 6-9. `smooth-scroll.astro`

**ファイルパス**: `src/pages/articles/smooth-scroll.astro`

**元ファイル**: `src/pug/pages/articles/smooth-scroll.pug`

> `.wrapper`（`scroll-behavior: smooth`）と `.new-wrapper`（`scroll-padding-top: 60px` も追加）の 2 つのスクロールデモを実装します。
>
> **注意**: デモ内の `#a`、`#b`、`#c`、`#aa`、`#bb`、`#cc` アンカーリンクはデモコンテナ内のみで機能するため、Astro の `<style>` スコープで問題なく動作します。

---

### 6-10. `transform.astro`

**ファイルパス**: `src/pages/articles/transform.astro`

**元ファイル**: `src/pug/pages/articles/transform.pug`

> `.old-obj`（`transform` ショートハンド）と `.new-obj`（独立プロパティ）のデモを実装します。

---

### 6-11. `css-custom-props-margin.astro`

**ファイルパス**: `src/pages/articles/css-custom-props-margin.astro`

**元ファイル**: `src/pug/pages/articles/css-custom-props-margin.pug`

> このページは CSS カスタムプロパティの活用デモページです。ダミーテキスト（日本語）とコードブロックのサンプル表示が主な内容です。

---

## 全ページ共通の実装ルール

### コードブロックの記述方法

Pug の `.` 記法で書かれていたコードブロックは、Astro では `<pre><code>` で記述します。

```astro
<pre><code class="language-scss">.box &#123;
  display: flex;
  gap: 16px;
&#125;</code></pre>
```

> `{` は `&#123;`、`}` は `&#125;` にエスケープするか、highlight.js が認識できる形で記述します。実際には通常の `{` `}` で記述しても問題ない場合が多いですが、Astro の JSX パーサーとの兼ね合いで必要に応じてエスケープしてください。

### `<code>` のクラス名

highlight.js が認識できるように、言語に応じたクラス名を付けます:

| 言語 | クラス名 |
|------|---------|
| HTML | `language-html` |
| CSS / SCSS | `language-scss` または `language-css` |
| JavaScript | `language-javascript` |

### 画像パス

`/assets/img/play.svg` は `public/assets/img/play.svg` に配置済みのため、そのまま使用できます。

---

## 完了条件

- [ ] `src/pages/articles/gap.astro` が作成されている
- [ ] `src/pages/articles/place-items.astro` が作成されている
- [ ] `src/pages/articles/inset.astro` が作成されている
- [ ] `src/pages/articles/aspectratio-objectfit.astro` が作成されている
- [ ] `src/pages/articles/clamp.astro` が作成されている
- [ ] `src/pages/articles/margin.astro` が作成されている
- [ ] `src/pages/articles/display-none.astro` が作成されている（JS 含む）
- [ ] `src/pages/articles/text-align-last.astro` が作成されている
- [ ] `src/pages/articles/smooth-scroll.astro` が作成されている
- [ ] `src/pages/articles/transform.astro` が作成されている
- [ ] `src/pages/articles/css-custom-props-margin.astro` が作成されている
- [ ] 全ページで CSS デモが正常に表示される
- [ ] `display-none.astro` のトグルボタンが動作する
- [ ] コードブロックに highlight.js のシンタックスハイライトが適用されている

---

次のステップ: [07-verification.md](./07-verification.md)
