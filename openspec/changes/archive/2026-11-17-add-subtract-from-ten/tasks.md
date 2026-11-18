# Tasks

## 1. 問題の種類

- [x] 1.1 `src/app/math/problems.ts` の `sub` の名前を「ひきざん１」に変え、`sub10`（名前「ひきざん２」、例 `10 − 3`、問題 `10 − 1`〜`10 − 9`）を `LEVELS` の最後に足す
- [x] 1.2 `problems.spec.ts` を更新する: ならびと名前が「たしざん１・ひきざん１・たしざん２・ひきざん２」、`sub10` の全問題が `10 − b`（b は 1〜9）で 9 通り、1 回分が 9 問で重複なし、10 問の種類は今までどおり 10 問。`npx ng test --watch=false` が通ること

## 2. 画面

- [x] 2.1 `src/styles.css` に `--sub10` の色を足し、`src/app/pages/home.ts` のメニューボタンに `.sub10` の色を付ける
- [x] 2.2 `play.spec.ts` に「ひきざん２ は `1 / 9` から始まり、9 問で『9もん ちゅう ○もん あってた』の結果になる」テストを足す。`npx ng test --watch=false` が通ること

## 3. 文言と確認

- [x] 3.1 `README.md` と `src/index.html` の description を 4 種類（ひきざん１・ひきざん２）に合わせる。`grep -rn "ひきざん[^１２]" src README.md` で古い名前が残っていないこと（説明文の「たしざん・ひきざん」は除く）
- [x] 3.2 `npx ng build --base-href /sansu-app/` が成功し、375px 幅のメニュー（4 つのボタン）と、ひきざん２ の出題画面・結果画面のスクリーンショットで表示がくずれていないこと
  - 確認時、375px 幅で `10 − 2 = ?` が右にはみ出したため、式の文字の大きさを `clamp(3rem, 15vw, 5.5rem)` → `clamp(2.6rem, 13vw, 5.5rem)` に下げた（320〜414px 幅で、はみ出さないことを確認）

## Workflow follow-up

- `openspec archive add-subtract-from-ten` で正式な仕様（`openspec/specs/`）に反映する
- コミットして push（ユーザーに確認してから）。push するとサイトに自動で公開される
- ブログ記事（`sansu-renshu-app`）の種類一覧とスクリーンショットを更新するか、ユーザーに確認する
