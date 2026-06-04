# 初期セットアップ

初めてこのプロジェクトを動かすときだけ必要な手順です。

---

## 必要なもの

- **Node.js** v20 以上（[nodejs.org](https://nodejs.org) からインストール）
- ターミナル（Mac: ターミナル.app / Windows: PowerShell）

バージョン確認:
```bash
node -v   # v20.x.x と表示されればOK
```

---

## セットアップ手順

### 1. プロジェクトフォルダに移動

```bash
cd Vitaledge/dev
```

### 2. パッケージをインストール

```bash
npm install
```

`node_modules/` フォルダが作成されます。初回のみ必要です。

### 3. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くとサイトが表示されます。

---

## ディレクトリ構成（管理に関わる部分のみ）

```
dev/
├── content/
│   └── cases/          ← 導入事例の記事ファイル（.md）
│       ├── _template.md  テンプレート（このファイルは公開されない）
│       └── clasian.md    記事ファイルの例
├── public/
│   ├── image/
│   │   └── FV.jpg      ← トップページのヒーロー背景画像
│   └── images/
│       └── cases/      ← 導入事例のアイキャッチ画像
└── docs/               ← このフォルダ
```

コンテンツを管理するうえで触るのは主に `content/cases/` と `public/images/cases/` の2か所です。
