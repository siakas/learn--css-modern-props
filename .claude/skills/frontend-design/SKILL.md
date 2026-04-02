# フロントエンド設計スキル

UI 実装前にモックアップ画像を自動生成し、ビジュアルで確認できるようにするスキルです。

## 目的

- **認識の齟齬を防ぐ**: 実装前にデザインをビジュアルで確認
- **効率化**: 手戻りを減らし、開発をスムーズに
- **技術的実現性の担保**: 実装可能なデザインのみ提案
- **ユーザー体験の向上**: 視覚的なコミュニケーション

## 自動起動の条件

以下のすべてを満たす場合、自動的にスキルが起動します：

1. ✅ ユーザーが UI の作成を依頼した
2. ✅ 具体的なデザイン指示がない、または曖昧
3. ✅ モックアップやワイヤーフレームが提供されていない
4. ✅ 既存コンポーネントの小規模な調整ではない
5. ✅ UI ライブラリのコンポーネント使用だけで済まない

### 例：自動起動されるケース

```text
"ホームページのレイアウトを変更して"
"記事一覧ページを追加"
"ナビゲーションを改善"
"新しいセクションを作って"
```

### 例：自動起動されないケース

```text
"このボタンの色を青に変更して" → 既存の小規模変更
"shadcn/ui の Card を使って" → UI ライブラリ指定済み
"padding を 16px にして" → スタイル調整のみ
"CSS デモのスタイルを修正して" → CSS 学習用デモの変更
```

## 実装フロー

```
1. ユーザーの要求を分析
   ↓
2. 画像生成プロンプトを作成（技術的制約を考慮）
   ↓
3. Recraft API で画像生成
   ↓
4. 画像を .claude/artifacts/ に保存
   ↓
5. 画像を表示してユーザーに確認
   ↓
6. ユーザー承認後に実装開始
```

## 技術的制約の考慮

画像生成時に以下を必ず考慮します：

### プロジェクトのスタック

- **フレームワーク**: Astro 6（静的サイト）
- **言語**: TypeScript 5
- **スタイリング**: Tailwind CSS v4（`@apply` 使用禁止）
- **UI ライブラリ**: shadcn/ui（Radix ベース）
- **クラス結合**: `cn` ユーティリティ（`clsx` + `tailwind-merge`）
- **インタラクティブ**: React 19（Astro アイランド）

### スタイリング方針

**原則として Tailwind CSS + shadcn/ui を使用し、オリジナルのスタイリングは行わない。**

以下は例外：

- **CSS 学習用デモ部分**（`src/pages/articles/` 内の `.sample-object` や `.block-content` 配下）— CSS プロパティの動作を示すためのスタイルは Astro のスコープ `<style>` タグに記述する

### 実装上の制約

- ✅ Tailwind CSS v4 で実装可能なレイアウト
- ✅ shadcn/ui コンポーネントで実現可能な UI
- ✅ レスポンシブデザイン対応
- ✅ アクセシビリティ（WCAG 準拠）
- ✅ Astro コンポーネント（`.astro`）を基本とし、インタラクションが必要な場合のみ React アイランドを使用

### プロンプト例

```text
Create a modern learning site layout with:
- Fixed sidebar navigation
- Article list with card grid
- Clean reading layout for article pages
Must be implementable with:
- Astro 6 (static site)
- Tailwind CSS v4
- shadcn/ui components
- Responsive design (mobile-first)
Style: Clean, minimal, focused on readability
```

## 画像生成の設定

### Recraft API パラメータ

```typescript
{
  prompt: string; // 生成する画像の詳細な説明
  style: "digital_illustration" | "realistic_image";
  size: "1024x1024"; // 正方形
  n: 1; // 生成枚数
}
```

### 推奨スタイル

- **digital_illustration**: UI/UX デザイン、モックアップに最適
- **realistic_image**: フォトリアリスティックな表現が必要な場合

## ユーザー承認プロセス

生成後、必ず以下のオプションを提示します：

```markdown
生成したモックアップです：

![mockup](.claude/artifacts/mockup-YYYYMMDD-HHMMSS.png)

### デザインの特徴

- レイアウト: [説明]
- カラースキーム: [説明]
- コンポーネント: [使用する shadcn/ui コンポーネント]
- レスポンシブ対応: [説明]

このデザインで実装を進めますか？

オプション:

- `y`: 承認して実装開始
- フィードバック: 「もっとモダンに」「色を変更」など
- `n`: キャンセル
```

## 重要な制約事項

### ❌ 使用しないケース

1. **既存 UI の小規模な変更**
   - ボタンの色変更
   - パディング・マージン調整
   - フォントサイズ変更

2. **デザインが明確に指定されている**
   - モックアップ画像が提供済み
   - 具体的な UI ライブラリコンポーネントを指定
   - 詳細な CSS 指示がある

3. **UI ライブラリのコンポーネントをそのまま使う**
   - "shadcn/ui の Button を使って"
   - "Radix UI の Dialog を追加"

4. **CSS 学習用デモの修正**
   - 記事ページの CSS デモ部分はオリジナル CSS で実装されており、このスキルの対象外

### ⚠️ 必須の注意点

1. **必ずユーザー承認を得る**
   - 画像生成後、実装前に確認
   - フィードバックに応じて再生成

2. **技術的実現性を最優先**
   - 実装不可能なデザインは避ける
   - プロジェクトのスタックに準拠

3. **既存 UI との一貫性**
   - プロジェクトの既存デザインシステムを考慮
   - カラースキーム、タイポグラフィの統一

## エラーハンドリング

### API エラー

```typescript
try {
  const image = await generateImage(prompt)
} catch (error) {
  if (error.code === 'RATE_LIMIT') {
    // レート制限時
    await sleep(1000)
    return retry()
  } else if (error.code === 'INVALID_PROMPT') {
    // プロンプトエラー
    return adjustPrompt(prompt)
  } else {
    // その他のエラー
    notifyUser('画像生成に失敗しました。代わりにテキストで説明します。')
  }
}
```

### フォールバック

画像生成が失敗した場合：

1. エラーをユーザーに通知
2. テキストベースでデザイン案を提示
3. ASCII アートやテキスト図でレイアウトを説明
4. ユーザーに承認を得てから実装開始

## 実際の使用例

### 例 1: ホームページのレイアウト変更

```markdown
ユーザー: "ホームページの記事グリッドを見直して"

Claude:
変更後のレイアウトのモックアップを生成します...

[生成された画像]

### デザインの特徴

- 記事カードを 3 カラムグリッドで配置
- 各カードにタイトル・説明を表示
- Tailwind CSS v4 + shadcn/ui Card コンポーネントで実装
- レスポンシブ対応（モバイルは 1 カラム）

使用するコンポーネント:

- Card, CardHeader, CardTitle, CardDescription

このデザインで実装を進めますか？
```

### 例 2: ナビゲーションの改善

```markdown
ユーザー: "サイドバーナビゲーションを改善して"

Claude:
改善後のナビゲーションのモックアップを生成します...

[生成された画像]

### デザインの特徴

- 現在のページをハイライト表示
- セクション区切りを追加
- Astro コンポーネント（Navigation.astro）として実装
- Tailwind CSS v4 のみで実装（オリジナル CSS なし）

このデザインで実装を進めますか？
```

## ベストプラクティス

### 1. プロンプトの構造化

```text
[目的] Create a [page/component type]

[主要機能]
- Feature 1
- Feature 2
- Feature 3

[技術的制約]
Must be implementable with:
- Astro 6 (static site)
- Tailwind CSS v4
- shadcn/ui components

[デザイン要件]
- Style: [modern/minimalist/etc]
- Layout: [grid/flex/etc]
- Responsive: [mobile-first/desktop-first]
```

### 2. 段階的な改善

1. **初回生成**: 基本的なレイアウト
2. **フィードバック**: ユーザーの要望を反映
3. **最終調整**: 技術的実現性を確認
4. **承認**: 実装開始

### 3. コンポーネントマッピング

生成したデザインを shadcn/ui コンポーネントにマッピング：

```typescript
// モックアップの要素 → shadcn/ui コンポーネント
{
  "カード": "Card + CardHeader + CardContent + CardTitle",
  "ボタン": "Button",
  "ナビゲーション": "Astro コンポーネント + Tailwind CSS",
  "モーダル": "Dialog + DialogContent",
  "アラート": "Alert + AlertDescription",
}
```

## まとめ

このスキルを使うことで：

1. ✅ 実装前にデザインを視覚的に確認
2. ✅ ユーザーとの認識の齟齬を防ぐ
3. ✅ 技術的に実装可能なデザインのみ提案
4. ✅ 開発効率を向上（手戻り削減）
5. ✅ プロジェクトの一貫性を保持

**最重要**: 必ずユーザー承認を得てから実装を開始すること。
