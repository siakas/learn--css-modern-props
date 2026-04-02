# 移行作業計画書

Pug + Sass + Gulp 構成から Astro + React + Tailwind CSS + shadcn/ui + Biome 構成への移行手順書です。

## 作業方針

本リプレイス作業は、このドキュメント群（作業計画書）と [TODO.md](./TODO.md)（TODO リスト）にもとづいて進めます。

- **作業計画書を逸脱した実装は行いません。** 方針変更が必要な場合は、先に計画書と TODO リストを更新してから作業に入ります。
- **TODO リストを唯一の進捗管理ツールとします。** 各タスクの着手・完了時に TODO.md のステータスを更新します。
- **Phase の順序を守ります。** 各 Phase は依存関係があるため、前の Phase が完了してから次に進みます。

---

## 背景・目的

現在のサイトは Pug テンプレート + Sass (FLOCSS) + Gulp 4 で構成されたモダン CSS 学習サイトです。
以下の目的で技術スタックをリプレイスします。

- **Astro** による静的サイト生成（SSG）への移行でビルド体験を向上
- **React** インテグレーションによるコンポーネント指向の開発
- **Tailwind CSS v4** による utility-first スタイリングへの移行
- **shadcn/ui** によるアクセシブルな UI コンポーネントの採用
- **Biome** による Prettier + StyleLint の一元化

## 移行後の技術スタック

| 役割 | 移行前 | 移行後 |
|------|--------|--------|
| ビルドツール | Gulp 4 | Astro（最新版） |
| テンプレート | Pug | Astro コンポーネント |
| インタラクティブ UI | 不使用 | React（`@astrojs/react`） |
| スタイル | Sass (FLOCSS) | Tailwind CSS v4 |
| UI コンポーネント | なし | shadcn/ui |
| Lint / Format | Prettier + StyleLint | Biome |
| 開発サーバー | BrowserSync | Astro dev server |

## ドキュメント一覧

| ファイル | 内容 |
|---------|------|
| [01-cleanup-and-init.md](./01-cleanup-and-init.md) | 旧ファイルの削除と Astro プロジェクト初期化 |
| [02-integrations.md](./02-integrations.md) | React・Tailwind CSS・Biome のセットアップ |
| [03-shadcn-setup.md](./03-shadcn-setup.md) | shadcn/ui のセットアップ |
| [04-layout-components.md](./04-layout-components.md) | レイアウト・共通コンポーネントの作成 |
| [05-home-page.md](./05-home-page.md) | ホームページの作成 |
| [06-article-pages.md](./06-article-pages.md) | 記事ページ（11 ページ）の作成 |
| [07-verification.md](./07-verification.md) | 動作確認・ビルド検証 |

## サイト構成（移行後）

```
src/
├── components/
│   ├── ui/                  # shadcn/ui コンポーネント（自動生成）
│   ├── Navigation.astro     # サイドバーナビゲーション
│   └── BackIndex.astro      # トップへ戻るリンク
├── layouts/
│   └── BaseLayout.astro     # 共通レイアウト
├── pages/
│   ├── index.astro          # ホームページ
│   └── articles/            # 記事ページ（11 ファイル）
├── styles/
│   └── globals.css          # Tailwind + グローバルスタイル
├── lib/
│   └── utils.ts             # cn() ユーティリティ
└── data/
    └── articles.json        # 記事メタデータ
```

## 記事一覧

| slug | タイトル |
|------|---------|
| `gap` | Flexbox の余白調整 |
| `place-items` | 天地中央 |
| `inset` | top / right / bottom / left をまとめて指定 |
| `aspectratio-objectfit` | 画像サイズを比率で調整（aspect-ratio と object-fit） |
| `clamp` | 最小値・推奨値・最大値の設定 |
| `margin` | 中央揃えのための `margin: 0 auto` |
| `display-none` | 表示／非表示の切り替えのための `display: none` |
| `text-align-last` | 一行テキストの両端揃え |
| `smooth-scroll` | スムーススクロール |
| `transform` | 独立した translate / scale / rotate |
| `css-custom-props-margin` | CSS カスタムプロパティによるマージン制御 |

## 重要な注意事項

- 記事の CSS デモ（`.sample-object` 内）は Tailwind では表現せず、各ページの `<style>` タグ（Astro スコープ）で記述する
- URL は `/articles/gap.html` → `/articles/gap`（`.html` なし）に変わる
- `articles.json` に未登録の `css-custom-props-margin` 記事は移行時に追加する
