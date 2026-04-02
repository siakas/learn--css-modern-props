# 移行作業 TODO

作業状況: `[ ]` 未着手 / `[/]` 作業中 / `[x]` 完了

---

## Phase 1: 旧ファイルの削除と Astro プロジェクト初期化

詳細: [01-cleanup-and-init.md](./01-cleanup-and-init.md)

- [x] ブランチ作成（`feature/astro-migration`）
- [x] `gulpfile.js/`、`gulp.config.js` の削除
- [x] `src/pug/` の削除
- [x] `src/sass/` の削除
- [x] `.prettierrc.toml`、`.stylelintrc.js` の削除
- [x] `dist/` の削除
- [x] `package.json` を Astro 用に書き換え
- [x] `astro@latest` のインストール
- [x] `astro.config.mjs` の作成（最小構成）
- [x] `tsconfig.json` の作成
- [x] `.gitignore` の更新
- [x] ディレクトリ構造の作成（`src/components/ui`、`src/layouts`、`src/pages/articles`、`src/styles`、`src/data`、`src/lib`、`public/assets/img`）
- [x] `src/data/articles.json` の作成（`src/json/articles.json` をコピーし、`css-custom-props-margin` 記事を追加）
- [x] `src/json/` の削除
- [x] `public/assets/img/play.svg` の配置

---

## Phase 2: React・Tailwind CSS・Biome のセットアップ

詳細: [02-integrations.md](./02-integrations.md)

- [x] `npx astro add react` の実行
- [x] `npx astro add tailwind` の実行（Tailwind v4 は `@tailwindcss/vite` プラグイン方式）
- [x] `src/styles/globals.css` の作成
- [x] `@biomejs/biome` のインストール・`npx biome init` の実行
- [x] `biome.json` の設定
- [ ] `npm run dev` での起動確認

---

## Phase 3: shadcn/ui のセットアップ

詳細: [03-shadcn-setup.md](./03-shadcn-setup.md)

- [x] `npx shadcn@latest init` の実行（`components.json` を手動作成）
- [x] `components.json` の確認
- [x] `src/lib/utils.ts` の確認（`clsx`、`tailwind-merge` のインストール）
- [x] `npx shadcn@latest add card` の実行
- [x] `globals.css` への shadcn/ui CSS 変数の統合
- [x] `tsconfig.json` の `@/*` パスエイリアス確認

---

## Phase 4: レイアウト・共通コンポーネントの作成

詳細: [04-layout-components.md](./04-layout-components.md)

- [ ] `src/layouts/BaseLayout.astro` の作成
- [ ] `src/components/Navigation.astro` の作成
- [ ] `src/components/BackIndex.astro` の作成

---

## Phase 5: ホームページの作成

詳細: [05-home-page.md](./05-home-page.md)

- [ ] `src/pages/index.astro` の作成
- [ ] ブラウザで動作確認（`http://localhost:4321/`）

---

## Phase 6: 記事ページの作成（11 ページ）

詳細: [06-article-pages.md](./06-article-pages.md)

- [ ] `src/pages/articles/gap.astro`
- [ ] `src/pages/articles/place-items.astro`
- [ ] `src/pages/articles/inset.astro`
- [ ] `src/pages/articles/aspectratio-objectfit.astro`
- [ ] `src/pages/articles/clamp.astro`
- [ ] `src/pages/articles/margin.astro`
- [ ] `src/pages/articles/display-none.astro`（JS 含む）
- [ ] `src/pages/articles/text-align-last.astro`
- [ ] `src/pages/articles/smooth-scroll.astro`
- [ ] `src/pages/articles/transform.astro`
- [ ] `src/pages/articles/css-custom-props-margin.astro`

---

## Phase 7: 動作確認・ビルド検証

詳細: [07-verification.md](./07-verification.md)

### 動作確認
- [ ] 全記事ページの表示確認
- [ ] CSS デモの動作確認（全ページ）
- [ ] `display-none` ページのトグルボタン動作確認
- [ ] `smooth-scroll` ページのスクロール動作確認
- [ ] コードブロックのシンタックスハイライト確認
- [ ] サイドバーナビゲーションの動作確認

### コード品質
- [ ] `npm run check`（Biome）でエラーゼロ
- [ ] `npx astro check`（TypeScript）でエラーゼロ

### ビルド
- [ ] `npm run build` が正常に完了する
- [ ] `npm run preview` でビルド成果物が正常に表示される
- [ ] `dist/` に全 12 ページ分の HTML が生成されている

---

## 最終確認

- [ ] コミットの作成
