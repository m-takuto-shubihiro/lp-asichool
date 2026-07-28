# 作業記録（PROGRESS）

LP制作演習リポジトリの進捗メモ。次回はこのファイルを最初に読んで、続きから再開する。

## リポジトリ情報

- ローカル: `C:\Users\takut\lp制作-AIの学校演習`
- リモート: https://github.com/m-takuto-shubihiro/lp-asichool
- 既定ブランチ: `main`

## 現在の状態（2026-07-28 時点）

セットアップのみ完了。LPの実体ファイル（HTML/CSS など）はまだ未作成。

管理下のファイル:

| ファイル | 内容 |
| --- | --- |
| `README.md` | リポジトリの概要（LP制作の演習用） |
| `.gitignore` | OS/エディタ/依存パッケージ・ビルド成果物/環境変数を除外 |
| `PROGRESS.md` | このファイル（作業記録） |

`.claude/settings.local.json` はローカル設定のためコミット対象外（`.git/info/exclude` で除外済み）。

## これまでの作業ログ

- 2026-07-28: リポジトリを作成し、`README.md` と `.gitignore` を初期コミット（`9196a6d`）。GitHub の `origin/main` へ push 済み。
- 2026-07-28: 作業記録として `PROGRESS.md` を追加。

## 次にやること（TODO）

- [ ] LPの要件を決める（誰向けの・何のLPか、掲載セクション、参考デザイン）
- [ ] ディレクトリ構成を決める（例: `index.html` / `css/` / `js/` / `images/`）
- [ ] ファーストビュー（ヒーローセクション）の作成
- [ ] 本文セクション（特徴 / 料金 / よくある質問 / CTA など）の作成
- [ ] レスポンシブ対応（スマホ表示の確認）
- [ ] 公開方法の検討（GitHub Pages など）

## 再開のしかた

```powershell
cd 'C:\Users\takut\lp制作-AIの学校演習'
git pull
```

そのうえで Claude Code に「PROGRESS.md を読んで続きから」と伝える。
