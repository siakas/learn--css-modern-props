# デザインブラッシュアップ計画

CSS 学習用デモ部分を除いたレイアウト・ナビゲーション・共通 UI を、オリジナル CSS から Tailwind CSS v4 + shadcn/ui ベースへ移行します。

## 対象ファイル

| ファイル                          | 現状                                              | 移行先                             |
| --------------------------------- | ------------------------------------------------- | ---------------------------------- |
| `src/layouts/BaseLayout.astro`    | オリジナル CSS（`<style>` タグ）                  | Tailwind クラス                    |
| `src/components/Navigation.astro` | オリジナル CSS（`<style>` タグ）                  | Tailwind クラス                    |
| `src/components/BackIndex.astro`  | オリジナル CSS（`<style>` タグ）                  | Tailwind クラス + shadcn/ui Button |
| `src/pages/index.astro`           | オリジナル CSS（`<style>` タグ） + shadcn/ui Card | Tailwind クラス + shadcn/ui Card   |

## 移行しない範囲

- `src/pages/articles/` 配下の各記事ページ内 `<style>` タグ（CSS 学習用デモ）
- `src/styles/globals.css` のベーススタイル・カスタムプロパティ
- `BaseLayout.astro` の `.block-content` タイポグラフィスタイル（記事ページ全体に適用される基盤スタイルのため、現状維持か Tailwind の `@layer` への移動かを確認が必要）

---

## ステップ

### Step 1: 事前確認・方針決定

- [ ] `globals.css` に定義済みのカスタムプロパティ（`--color-teal: #319795` 等）を Tailwind テーマに登録し、クラスとして使えるようにする（例：`text-teal`）
  - [Question] `--color-teal`（`#319795`）などのサイト固有カラーを Tailwind のテーマカラーとして登録する場合、Tailwind v4 の `@theme` ブロックを `globals.css` 内に記述する形でよいですか？
  - [Answer]
    - 既存のカラーをそのまま踏襲する必要はない。既存テーマカラーに置き換えて構わない。新たなカラーが必要と思えば別途こちらで指示する。

- [ ] `.block-content` 配下のタイポグラフィスタイル（`h1`〜`h3`、`p`、`pre`、`.sample-object` など）の扱いを決定する
  - [Question] `.block-content` のスタイルは記事ページ全体のタイポグラフィ基盤です。これは現状の `BaseLayout.astro` の `<style>` タグに残すか、`globals.css` の `@layer` へ移動するか、どちらを希望しますか？（Tailwind クラスへの変換は記事ページの `.block-content` 内に都度クラスを書く必要があり煩雑なため、グローバルスタイルとして残す方が現実的です）
  - [Answer]
    - Tailwind Typography を導入し、利用する。

---

### Step 2: `Navigation.astro` の移行

- [ ] `<style>` タグを削除し、Tailwind クラスに置き換える
  - ロゴ（`#` リンク）のスタイル
  - ナビゲーションリスト・各リンクのスタイル
  - 現在ページのハイライト（`.is-current`）を Tailwind クラスで表現

---

### Step 3: `BackIndex.astro` の移行

- [ ] `<style>` タグを削除し、Tailwind クラスに置き換える
  - [Question] 「トップへ戻る」ボタンは shadcn/ui の `Button` コンポーネント（`variant="outline"` 等）に置き換えてよいですか？それとも `<a>` タグに Tailwind クラスを当てるだけにしますか？
  - [Answer]
    - Button コンポーネントに置き換える。

---

### Step 4: `BaseLayout.astro` のレイアウトスタイル移行

- [ ] ラッパー・コンテナ・メイン・サイドバーのレイアウト CSS（`.wrapper`、`.container`、`.main`、`.side`）を Tailwind クラスに置き換える

---

### Step 5: `index.astro` のスタイル移行

- [ ] ホームページの `<style>` タグを削除し、Tailwind クラスに置き換える
  - `h1` スタイル
  - `.home-index` のグリッドレイアウト
  - カードリンクのスタイル

---

### Step 6: 品質チェック・確認

- [ ] `pnpm biome ci .` でエラーがないことを確認
- [ ] `pnpm build` でビルドが通ることを確認
- [ ] ブラウザで表示を確認（ホームページ・記事ページ・レスポンシブ）
- [ ] コミット
