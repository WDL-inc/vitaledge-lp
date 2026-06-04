# ビルドとデプロイ

---

## ビルド（本番用ファイルの生成）

デプロイ前にビルドが通ることを確認します。

```bash
npm run build
```

エラーなく完了すると `.next/` フォルダに本番用ファイルが生成されます。

---

## Vercel でのデプロイ（推奨）

### 初回セットアップ

1. [vercel.com](https://vercel.com) でアカウントを作成・ログイン
2. 「Add New Project」からこのリポジトリを連携
3. フレームワークは **Next.js** を選択（自動検出される）
4. 「Deploy」を押すと自動でビルド・公開される

### プレビュー公開をBasic認証で保護する場合

Vercel の Project Settings > Environment Variables で以下を設定します。

```text
BASIC_AUTH_USER=任意のユーザー名
BASIC_AUTH_PASSWORD=十分に長いパスワード
```

この2つを設定した環境だけ、サイト全体にBasic認証がかかります。ソースコードには本物のID・パスワードを書かないでください。

### 独自ドメイン `vitaledge.jp` を使う場合

1. Vercel の Project Settings > Domains で `vitaledge.jp` と `www.vitaledge.jp` を追加
2. お名前.comに `A vitaledge.jp 76.76.21.21` を登録
3. お名前.comに `A www.vitaledge.jp 76.76.21.21` を登録
4. DNS反映を待つ
5. Vercel 側でSSL証明書の発行完了を確認
6. どちらを正規URLにするかを確認する。推奨は `vitaledge.jp` を正規URLにすること

### 記事を追加・更新したあと

Vercel と Git リポジトリを連携している場合、**`main` ブランチにプッシュするだけで自動デプロイ**されます。

```bash
git add content/cases/new-article.md
git add public/images/cases/new-article.jpg
git commit -m "導入事例: 株式会社〇〇を追加"
git push
```

プッシュ後、Vercel のダッシュボードでデプロイの進行状況を確認できます（通常1〜2分）。

---

## 手動デプロイ（サーバーに直接上げる場合）

### ビルド

```bash
npm run build
```

### サーバーで起動

```bash
npm run start
```

デフォルトは `http://localhost:3000` で起動します。Nginx や Apache でリバースプロキシを設定してください。

---

## デプロイ後の確認チェックリスト

- [ ] トップページが表示される
- [ ] 導入事例一覧（`/cases`）に記事が表示される
- [ ] 各記事ページが開ける
- [ ] アイキャッチ画像が表示される
- [ ] お問い合わせフォームのリンクが正しく飛ぶ
