# 導入事例の追加・編集

---

## 記事を追加する

### 1. テンプレートをコピーする

`content/cases/_template.md` をコピーして、新しいファイル名で保存します。

```
content/cases/company-name.md
```

ファイル名がURLになります（例: `clasian.md` → `/cases/clasian`）。  
英小文字・ハイフン区切りを推奨します。

### 2. フロントマターを埋める

ファイルの先頭 `---` で囲まれた部分が記事情報です。

```yaml
---
slug: clasian
title: "若手スタッフの健康意識醸成へ！従業員ウェルネス最大化へのPoC"
client: "株式会社クラシアン"
industry: "住宅・設備"
employeeCount: "1,408名"
publishedAt: "2026-04-16"
thumbnail: "/images/cases/clasian.jpg"
---
```

| フィールド | 説明 |
|---|---|
| `slug` | URLに使う識別子。ファイル名と合わせる |
| `title` | 記事タイトル |
| `client` | 掲載企業の正式名称 |
| `industry` | 業種 |
| `employeeCount` | 従業員数（「1,408名」などそのまま書く） |
| `publishedAt` | 公開日（`YYYY-MM-DD` 形式） |
| `thumbnail` | アイキャッチ画像のパス（次の手順で配置） |

### 3. アイキャッチ画像を配置する

`public/images/cases/` に画像ファイルを置きます。

```
public/images/cases/clasian.jpg
```

- 推奨サイズ: 横1200px 以上、16:9 または 3:2 比率
- フォーマット: `.jpg` / `.png` / `.webp`
- 画像がなくてもビルドエラーにはなりません（グレー背景で表示）

### 4. 本文を書く

`---` の下から本文を書きます。Google Docs からそのままペーストしても問題ありません。

```markdown
段落は空行で区切ります。

## 大見出し

### 小見出し

> 担当者コメントや引用は「>」で始めるとハイライト表示されます。
```

---

## 記事を編集する

`content/cases/{スラッグ}.md` を直接編集します。  
開発サーバーが起動中であれば、保存するとブラウザに即時反映されます。

---

## 記事を非公開にする

ファイル名の先頭に `_` をつけると非公開になります。

```
clasian.md  →  _clasian.md（非公開）
```

削除せずに一時的に下げたい場合に使えます。

---

## 確認方法

開発サーバーを起動して確認します。

```bash
npm run dev
```

- 一覧: [http://localhost:3000/cases](http://localhost:3000/cases)
- 記事: [http://localhost:3000/cases/{スラッグ}](http://localhost:3000/cases/clasian)
