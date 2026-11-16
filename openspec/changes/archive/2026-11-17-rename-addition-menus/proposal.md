# Proposal

## Why

メニューの「くりあがらない たしざん」「くりあがりの ある たしざん」は、1 年生には長くて読みにくく、
2 つの違いもひと目でわかりにくい。やさしい方から順に番号をつけた短い名前にする。

## What Changes

- 「くりあがらない たしざん」の名前を「たしざん１」に変える
- 「くりあがりの ある たしざん」の名前を「たしざん２」に変える
- 「ひきざん」の名前、メニューの並び順、問題の範囲、例の表示は変えない
- 出題画面の上に出る種類の名前も、新しい名前になる

## Capabilities

### New Capabilities

（なし）

### Modified Capabilities

- `problem-sets`: 足し算 2 種類の名前を「たしざん１」「たしざん２」に変える（問題の範囲は変えない）
- `practice-session`: メニュー画面に表示する種類の名前を変える

## Impact

- 問題の種類の名前の定義（`src/app/math/problems.ts`）
- `README.md`、`src/index.html` の description にある名前
- URL（`/play/add`・`/play/carry`）は変えないので、ブックマークや GA の集計には影響しない
