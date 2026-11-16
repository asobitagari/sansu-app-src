# Tasks

## 1. 名前の変更

- [x] 1.1 `src/app/math/problems.ts` の `add` の名前を「たしざん１」、`carry` の名前を「たしざん２」に変える。名前をたしかめるテストを `problems.spec.ts` に足し、`npx ng test --watch=false` が通ること
- [x] 1.2 `README.md` と `src/index.html` の description の名前を新しい名前に合わせる（`grep -rn "くりあがらない たしざん\|くりあがりの ある たしざん" src` で何も出ないこと。README は説明として残してよい）

## 2. 確認

- [x] 2.1 `npx ng build --base-href /sansu-app/` が成功し、375px 幅のメニューと出題画面のスクリーンショットで新しい名前が表示されていること

## Workflow follow-up

- `openspec archive rename-addition-menus` で正式な仕様（`openspec/specs/`）に反映する
- コミットして push（ユーザーに確認してから）
