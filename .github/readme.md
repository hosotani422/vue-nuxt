# Memosuku

## インストール

- Node.js - JS実行環境\
  LTSの最新バージョンを選択（.nvmrcファイルに正確な値を記載）\
  ※ Node.jsを直接使用するよりNode.jsのバージョン管理を使用することを推奨\
  windowsの場合fnmがお勧め（.nvmrcファイルで自動切り替えが可能）

- pnpm - パッケージ管理\
  インストール

  ```
  npm install -g pnpm
  ```

  ※ パッケージ管理には他にもnpm、yarnなど存在するが依存関係の優位性からpnpmを選択

- Git - バージョン管理\
  最新バージョンをサイトからダウンロードしてインストール\
  [https://git-scm.com/downloads](https://git-scm.com/downloads)

- VSCode - エディター\
  各OSの最新バージョンを以下のサイトからダウンロードしてインストール\
  [https://code.visualstudio.com/download](https://code.visualstudio.com/download)

## プラグイン

1. VSCodeの拡張機能の検索で「@recommended」と入力
2. お勧めの拡張機能が表示されるので必要も応じてインストール

## 設定

- .vscode/settings.jsonファイルから自動で反映（何もしなくて良い）

## ソースコード

- 以下リポジトリをクローン\
  HTTPS\
  https://github.com/hosotani422/vue-nuxt.git\
  SSH\
  git@github.com:hosotani422/vue-nuxt.git

## パッケージ

- パッケージのインストール

  ```
  pnpm i
  ```

## 起動/ビルド

- 開発モードで起動

  ```
  pnpm dev
  ```

- 本番モードでビルド

  ```
  pnpm build
  ```

## 保守/管理

- Husky\
  Gitコミット時にリンター（prettier、stylelint、ESLint）が実施される\
  これらのテストが正常に動作しない場合コミットは回避される\
  ※ テストは実施時間が長い為、コミット時には実施しない

- CI/CD\
  GitHubプルリクマージ時にリンター（prettier、stylelint、ESLint）、テスト（vitest、vue/test-utils、playwright、storybook）が実施される\
  これらのテストが正常に動作しない場合マージは回避される

- UI管理\
  GitHubプルリクマージ時にStorybookのデプロイが行われる為、以下URLにてデザインを確認可能
  https://hosotani422.github.io/vue-nuxt/
