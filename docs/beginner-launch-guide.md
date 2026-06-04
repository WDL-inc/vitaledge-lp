# Vitaledge LP Beginner Launch Guide

このドキュメントは、GitHub・Vercel・ドメイン設定に慣れていない人でも、Vitaledge LPを安全に本番公開できるようにするためのガイドです。

## 全体像

LP公開は、大きく分けると4つの箱で考えます。

```text
1. ソースコードを置く場所
   GitHub: WDL-inc/vitaledge-lp

2. Webサイトを動かす場所
   Vercel

3. ユーザーがアクセスする住所
   vitaledge.jp

4. 住所とWebサイトをつなぐ設定
   お名前.com の DNS
```

GitHubは「設計図の保管場所」、Vercelは「設計図からWebサイトを建てる場所」、ドメインは「お客様が訪問する住所」です。

## いま完了していること

- 会社組織 `WDL-inc` 配下に正式リポジトリを作成済み
- `https://github.com/WDL-inc/vitaledge-lp` にコードをpush済み
- ローカルの標準リモート `origin` は会社リポジトリを向いている
- `npm run build` は成功済み
- 公開に不要な `/design-system` ページは削除済み
- `/terms` と `/privacy` ページは作成済み
- ローンチ確認用ドキュメントを追加済み

## GitHubで今後守ること

### main ブランチ

`main` は本番公開の元になる大事なブランチです。

今後は、デザイナーや開発者が直接 `main` を編集するのではなく、以下の流れにします。

```text
作業ブランチを作る
↓
変更する
↓
Pull Requestを作る
↓
確認する
↓
mainにマージする
↓
Vercelが自動で本番更新する
```

この流れにすると、「誰が何を変えたか」「いつ壊れたか」を追いやすくなります。

### 旧リポジトリ

旧リポジトリ:

```text
takumifujinumawdl/wdl_vitaledge_lp_v2
```

これは今後の本番運用では使いません。履歴確認用として残すだけにします。

## Vercelでやること

Vercelは、GitHubのコードを読み取ってWebサイトとして公開してくれるサービスです。

### 1. Vercelにログイン

Vercelにログインします。

```text
https://vercel.com
```

会社アカウントまたは会社で管理するチームで作業してください。

### 2. New Projectを作る

Vercelで以下を選びます。

```text
Add New...
↓
Project
↓
Import Git Repository
↓
WDL-inc/vitaledge-lp
```

もし `WDL-inc/vitaledge-lp` が表示されない場合は、VercelのGitHub連携に `WDL-inc` へのアクセス許可がありません。

その場合は、Vercel側でGitHub Appの権限を更新します。

### 3. Build設定

Next.jsなので、基本は自動検出されます。

確認する項目:

```text
Framework Preset: Next.js
Build Command: npm run build
Install Command: npm install または npm ci
Output Directory: 空欄またはVercel標準
```

### 4. 最初のDeploy

`Deploy` ボタンを押すと、VercelがGitHubのコードを読み取り、仮URLを発行します。

例:

```text
https://vitaledge-lp-xxxxx.vercel.app
```

この時点では、まだ `vitaledge.jp` ではありません。

## プレビューを非公開にしたい場合

公開前の確認URLを外部に見られたくない場合は、Basic認証を使います。

VercelのEnvironment Variablesに以下を設定します。

```text
BASIC_AUTH_USER
BASIC_AUTH_PASSWORD
```

例:

```text
BASIC_AUTH_USER=preview
BASIC_AUTH_PASSWORD=長くて推測されにくい文字列
```

本番公開時に誰でも見られる状態にする場合は、Production環境にはこの2つを設定しないでください。

## ドメイン vitaledge.jp をつなぐ

ドメインは、お名前.comで取得済みです。

Vercelとお名前.comをつなぐ流れはこうです。

```text
Vercelに vitaledge.jp を登録
↓
VercelがDNSレコードを指示する
↓
お名前.comにそのDNSレコードを入力
↓
しばらく待つ
↓
https://vitaledge.jp がVercelに向く
```

### Vercel側

Project Settings > Domains で以下を追加します。

```text
vitaledge.jp
```

必要であれば以下も追加します。

```text
www.vitaledge.jp
```

おすすめは、どちらかを正規URLにすることです。

例:

```text
vitaledge.jp を正規URL
www.vitaledge.jp は vitaledge.jp にリダイレクト
```

### お名前.com側

Vercelに表示されたDNSレコードを、お名前.comのDNS設定に登録します。

よくあるパターン:

```text
Aレコード
CNAMEレコード
```

実際の値はVercel画面に表示されるものを使ってください。推測で入力しないでください。

## 公開前チェック

本番公開前に、最低限このページを確認します。

```text
/
/cases
/cases/clasian
/terms
/privacy
```

見た目の確認:

- ファーストビューが崩れていない
- ヘッダーのロゴが正しい
- フッターのロゴが正しい
- 黒背景のグラフィックが自然に見える
- 導入事例画像が表示される
- スマホで文字がはみ出さない
- CTAボタンが押せる
- メールリンクが意図した宛先になっている

## 公開前に決めること

### CTAメール

現在は以下です。

```text
info@wdlab.jp
```

`info@vitaledge.jp` を使いたい場合は、先にメール受信設定を作ってから差し替えます。

### 法務ページ

`/terms` と `/privacy` は公開用の最低限の雛形です。

外部公開前に、必要に応じて弁護士・社労士・個人情報管理担当に確認してください。

### 導入事例

`/cases/wdl` は例コンテンツです。

本番に出すなら、内容を実在の公開可能な情報に直すか、非公開にしてください。

## 公開後にやること

### GitHubのmain保護

本番公開後は、GitHubで `main` を保護します。

目的:

- 誤って本番コードを書き換えない
- Pull Request経由にする
- レビューなしの変更を減らす

### Vercelの自動Deploy

Vercel連携後は、基本的にこう動きます。

```text
GitHubのmainにpush
↓
Vercelが自動でbuild
↓
本番サイトが更新
```

つまり、GitHubの `main` が本番サイトの元になります。

## 困ったときの見方

### サイトが表示されない

確認順:

```text
1. VercelのDeployが成功しているか
2. GitHubのmainに最新コードがあるか
3. DNS設定がVercelの指示通りか
4. SSL証明書が発行済みか
```

### デザインが古い

過去に `dev/` と `src/` の二重構成がありました。

本番表示に使うのは基本的に `src/` と `public/` です。

```text
src/     アプリの本体
public/ 画像など公開ファイル
dev/     過去のプロトタイプ参照
```

今後は `src/` と `public/` を正として編集してください。
