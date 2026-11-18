# さんすう れんしゅう

小学校 1 年生向けの、たしざん・ひきざんの練習アプリです。

**アプリ: https://asobitagari.xyz/sansu-app/**

スマホやタブレット、PC のブラウザで使えます。PWA なので、ホーム画面にインストールすることもできます。

## できること

メニューから 4 種類の問題を選びます。

1. たしざん１（くりあがらない たしざん。例: 3 + 4）
2. ひきざん１（マイナスにならない。例: 8 − 5）
3. たしざん２（くりあがりの ある たしざん。例: 7 + 6）
4. ひきざん２（10 から 1 けたを ひく。例: 10 − 3）

1 回 10 問（ひきざん２ は 9 とおりを全部出すので 9 問）で、同じ問題は出ません。
問題を見て答えを考えたら「こたえを みる」を押し、「あってた」「まちがってた」を自分で選びます。
全部終わると、あってた数と、まちがえた問題の一覧が出ます。

## 開発

Angular 22 + PWA（`@angular/service-worker`）、テストは Vitest です。

```sh
npm ci
npx ng serve                 # http://localhost:4200/
npx ng test --watch=false    # テスト
npx ng build --base-href /sansu-app/
```

仕様は [OpenSpec](https://github.com/Fission-AI/OpenSpec) で `openspec/specs/` に書いています。

## 公開のしくみ

このリポジトリ（`sansu-app-src`）の `main` に push すると、GitHub Actions がテストとビルドを行い、
ビルド結果を GitHub Pages 用のリポジトリ [`asobitagari/sansu-app`](https://github.com/asobitagari/sansu-app) に push します。
書き込みにはデプロイキー（Secret `PAGES_DEPLOY_KEY`）を使います。
