# Design

## Context

種類の名前は問題の定義（`LEVELS` の `title`）に 1 か所だけあり、メニュー画面と出題画面の両方がそれを表示している。

## Decisions

- 名前は `title` だけを変える。種類の ID（`add` / `carry`）と URL（`/play/add` / `/play/carry`）は変えない。
  ホーム画面に追加した PWA やブックマーク、GA のページパス別の集計がそのまま使えるようにするため。
- 数字はユーザーの指定どおり全角（「たしざん１」「たしざん２」）にする。

## Open Questions

（なし）
