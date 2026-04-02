# 01. 旧ファイルの削除と Astro プロジェクト初期化

## 概要

既存の Gulp / Pug / Sass 関連ファイルを削除し、Astro プロジェクトとして再初期化します。

---

## 手順

### 1-1. 移行前のバックアップ（任意）

必要であれば、現在のブランチから新しいブランチを切ってから作業を開始してください。

```bash
git checkout -b feature/astro-migration
```

---

### 1-2. 旧ファイル・ディレクトリの削除

以下のファイルとディレクトリを削除します。

```bash
# Gulp 関連
rm -rf gulpfile.js/
rm -f gulp.config.js

# Pug テンプレート
rm -rf src/pug/

# Sass スタイル
rm -rf src/sass/

# データファイル（後で src/data/ に移行）
# ※ この時点ではまだ削除しない。移行後に削除する

# Lint / Format 設定
rm -f .prettierrc.toml
rm -f .stylelintrc.js

# ビルド成果物（Astro が dist/ を再生成するため）
rm -rf dist/
```

> **注意**: `src/json/articles.json` は移行先（`src/data/articles.json`）にコピー後に削除してください。

---

### 1-3. `package.json` の書き換え

旧依存関係をすべて削除し、Astro プロジェクト用に書き換えます。

```json
{
  "name": "learn--css-modern-props",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "biome lint ./src",
    "format": "biome format --write ./src",
    "check": "biome check --write ./src"
  }
}
```

---

### 1-4. Astro のインストール

```bash
npm install astro@latest
```

インストール後、現時点でのバージョンを確認します。

```bash
npx astro --version
```

---

### 1-5. Astro の最小設定ファイルを作成

**`astro.config.mjs`**（後のステップで integrations を追記します）:

```js
import { defineConfig } from 'astro/config'

export default defineConfig({
  output: 'static',
})
```

---

### 1-6. `tsconfig.json` を作成

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

### 1-7. `.gitignore` の更新

既存の `.gitignore` に以下を追加します（なければ新規作成）:

```
# Astro
dist/
.astro/

# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# 環境変数
.env
.env.*
!.env.example
```

---

### 1-8. ディレクトリ構造の準備

必要なディレクトリを作成します。

```bash
mkdir -p src/components/ui
mkdir -p src/layouts
mkdir -p src/pages/articles
mkdir -p src/styles
mkdir -p src/data
mkdir -p src/lib
mkdir -p public/assets/img
```

---

### 1-9. データファイルの移行

```bash
cp src/json/articles.json src/data/articles.json
```

あわせて、`articles.json` に未登録だった `css-custom-props-margin` 記事を追加します。

**`src/data/articles.json`** の `articles` 配列末尾に以下を追記:

```json
{
  "title": "CSS カスタムプロパティによるマージン制御",
  "slug": "css-custom-props-margin",
  "description": "CSS カスタムプロパティを利用した見出しとテキスト間のマージン制御の手法について"
}
```

追記後は旧ファイルを削除します:

```bash
rm -rf src/json/
```

---

### 1-10. 画像ファイルの移行

`dist/assets/img/` 以下の画像を `public/assets/img/` にコピーします。

```bash
cp dist/assets/img/play.svg public/assets/img/play.svg
```

---

## 完了条件

- [ ] `gulpfile.js/`、`gulp.config.js` が削除されている
- [ ] `src/pug/`、`src/sass/`、`src/json/` が削除されている
- [ ] `.prettierrc.toml`、`.stylelintrc.js` が削除されている
- [ ] `package.json` が Astro 用に書き換えられている
- [ ] `astro.config.mjs`、`tsconfig.json` が作成されている
- [ ] `src/data/articles.json` が 11 記事すべてを含んでいる
- [ ] `public/assets/img/play.svg` が配置されている

---

次のステップ: [02-integrations.md](./02-integrations.md)
