# 07. 動作確認・ビルド検証

## 概要

全ページの実装完了後、開発サーバーでの動作確認、ビルド、Biome チェックを行います。

---

## 手順

### 7-1. 開発サーバーでの動作確認

```bash
npm run dev
```

`http://localhost:4321/` でブラウザを開き、以下を確認します。

#### ホームページ（`/`）

- [ ] ページタイトルが「モダン CSS の学習 〜今はこう書けますよ〜」と表示される
- [ ] 11 記事のカードが 2 カラムグリッドで表示される
- [ ] サイドバーに 11 記事のナビゲーションリンクが表示される
- [ ] ロゴ `#` クリックでホームページに戻る
- [ ] 各カードのリンクが `/articles/{slug}` に遷移する

#### 記事ページ（全 11 ページ）

各 URL でページを開き、以下を確認します:

| URL | 確認ポイント |
|-----|-------------|
| `/articles/gap` | Flexbox デモ（赤と青のボックス）が表示される |
| `/articles/place-items` | ハンバーガーアイコンデモが 3 種類表示される |
| `/articles/inset` | 外部画像（picsum.photos）と play.svg アイコンが表示される |
| `/articles/aspectratio-objectfit` | カードサンプル 3 種（背景画像方式・img 方式・各種比率）が表示される |
| `/articles/clamp` | 可変幅ボックスとテキストデモが表示される |
| `/articles/margin` | 赤と青のセンタリングボックスが表示される |
| `/articles/display-none` | 「表示」「非表示」ボタンが動作する（2 組） |
| `/articles/text-align-last` | テーブルの両端揃えデモが表示される |
| `/articles/smooth-scroll` | セクション間のスムーズスクロールが機能する |
| `/articles/transform` | 変形されたボックスが表示される |
| `/articles/css-custom-props-margin` | ダミーテキストとコードブロックが表示される |

#### 全ページ共通確認

- [ ] サイドバーナビゲーションが全ページで表示される
- [ ] 「トップへ戻る」リンクが記事ページ（ホームページ以外）に表示される
- [ ] コードブロックに highlight.js のシンタックスハイライトが適用されている
- [ ] ロゴ `#` リンクでホームページに遷移する
- [ ] サイドバーのナビリンクで各記事に遷移できる

---

### 7-2. Biome チェック

```bash
npm run check
```

エラーや警告がある場合は修正します。

```bash
# フォーマットのみ自動修正
npm run format

# Lint エラーの確認
npm run lint
```

> `.astro` ファイルは Biome が部分的にしか対応していないため、`<script>` ブロック内の TypeScript/JavaScript のみチェックされます。

---

### 7-3. TypeScript チェック

```bash
npx astro check
```

型エラーが出た場合は修正します。

---

### 7-4. 本番ビルド

```bash
npm run build
```

成功すると `dist/` ディレクトリに静的ファイルが生成されます。

```
dist/
├── index.html
└── articles/
    ├── gap/index.html
    ├── place-items/index.html
    ├── inset/index.html
    ├── aspectratio-objectfit/index.html
    ├── clamp/index.html
    ├── margin/index.html
    ├── display-none/index.html
    ├── text-align-last/index.html
    ├── smooth-scroll/index.html
    ├── transform/index.html
    └── css-custom-props-margin/index.html
```

> URL が `/articles/gap` になるため、`dist/articles/gap/index.html` として出力されます（旧 `dist/articles/gap.html` から変更）。

---

### 7-5. プレビューサーバーでの確認

```bash
npm run preview
```

`http://localhost:4321/` でビルド成果物を確認します。
開発サーバーと同じ動作であることを確認します。

---

### 7-6. ビルド成果物のチェックポイント

- [ ] `dist/index.html` が存在する
- [ ] `dist/articles/` 以下に 11 ディレクトリが存在する
- [ ] 各ディレクトリに `index.html` が存在する
- [ ] CSS が正しくインライン化またはリンクされている
- [ ] JavaScript（`display-none` ページ）が含まれている

---

## よくある問題と対処

### `@/` エイリアスが解決できない

`tsconfig.json` の `paths` 設定が正しいか確認します:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### highlight.js が動作しない

`BaseLayout.astro` の `<script>` タグが正しく配置されているか確認します。
CDN を使用している場合、`<script src="...">` タグの後に `<script>hljs.highlightAll()</script>` がある必要があります。

### Astro の `<style>` スコープで `.sample-object` 内のスタイルが効かない

Astro のスコープ CSS は同一コンポーネント内の要素にのみ適用されます。
`BaseLayout.astro` の `:global()` セレクタを使用するか、各記事ページの `<style>` タグで定義します。

### shadcn/ui コンポーネントの React エラー

shadcn/ui は React コンポーネントのため、Astro ページで使用する場合は `client:load` ディレクティブが必要な場合があります（静的レンダリングのみなら不要）。

```astro
<!-- 静的（デフォルト）: インタラクションなし -->
<Card>...</Card>

<!-- インタラクティブな場合 -->
<InteractiveCard client:load />
```

---

## 完了確認チェックリスト

### 機能確認

- [ ] ホームページに 11 記事のカードが表示される
- [ ] 全記事ページが正常に表示される
- [ ] CSS デモが全ページで機能している
- [ ] `display-none` ページのトグルが動作する
- [ ] `smooth-scroll` ページのスクロール動作が機能する
- [ ] コードブロックのシンタックスハイライトが機能する
- [ ] サイドバーナビゲーションが全ページで機能する

### コード品質

- [ ] `npm run check`（Biome）でエラーゼロ
- [ ] `npx astro check`（TypeScript）でエラーゼロ

### ビルド

- [ ] `npm run build` がエラーなく完了する
- [ ] `npm run preview` で本番ビルドが正常に動作する
- [ ] `dist/` に全 12 ページ（ホーム + 記事 11）分の HTML が生成されている

---

すべてのチェックが完了したら、コミットを作成します:

```bash
git add .
git commit -m "追加: Astro + React + Tailwind CSS + shadcn/ui への移行"
```
