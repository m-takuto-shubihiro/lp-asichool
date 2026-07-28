# 作業記録（PROGRESS）

LP制作演習リポジトリの進捗メモ。次回はこのファイルを最初に読んで、続きから再開する。

## リポジトリ情報

- ローカル: `C:\Users\takut\lp制作-AIの学校演習`
- リモート: https://github.com/m-takuto-shubihiro/lp-asichool
- 既定ブランチ: `main`
- 公開URL: https://m-takuto-shubihiro.github.io/lp-asichool/ （GitHub Pages・public）

## 現在の状態（2026-07-28 時点）

LP本体を作成し、GitHub Pages で公開済み。

管理下のファイル:

| ファイル | 内容 |
| --- | --- |
| `index.html` | LP本体（1枚もの・ビルド不要） |
| `css/style.css` | スタイル。色・書体はすべて `:root` のカスタムプロパティ |
| `js/main.js` | スマホメニュー開閉、スクロール表示 |
| `images/.gitkeep` | 画像置き場（現状は空） |
| `README.md` | 題材・構成・差し替え箇所 |
| `.gitignore` | OS/エディタ/依存パッケージ・ビルド成果物/環境変数を除外 |
| `PROGRESS.md` | このファイル（作業記録） |

`.claude/settings.local.json` はローカル設定のためコミット対象外（`.git/info/exclude` で除外済み）。

## LPの内容

架空のAIスクール **問学舎（もんがくしゃ）** の受講生募集LP。非エンジニアの社会人向け・全8回のオンライン講座。
ページの役割は「無料説明会への申込」ひとつ。

- コンセプト: 「答えより先に、問いを」。カリキュラム各回のタイトルをすべて問い文にしている
- ファーストビュー: 縦組み明朝「AIに、何を訊くか。」＋原稿用紙の罫。`text-combine-upright` で AI のみ正立
- 配色: 藍 / 深藍 / 白藍 / 青磁 / 山吹（CTA）
- 書体: しっぽり明朝B1・Zen角ゴシックNew・IBM Plex Mono（Google Fonts）
- セクション: ヒーロー → 現在地 → 考え方 → カリキュラム(全8回) → 受講の流れ → 講師 → 受講生の声 → 料金 → FAQ → CTA → フッター

掲載している学校名・講師・声・料金・日程はすべて架空。フッターにその旨を明記している。

## これまでの作業ログ

- 2026-07-28: リポジトリを作成し、`README.md` と `.gitignore` を初期コミット（`9196a6d`）。GitHub の `origin/main` へ push 済み。
- 2026-07-28: 作業記録として `PROGRESS.md` を追加。
- 2026-07-28: LP本体（`index.html` / `css/style.css` / `js/main.js`）を作成。README を書き直し。
- 2026-07-28: リポジトリを public に変更し、GitHub Pages（`main` / root）で公開。

## 次にやること（TODO）

- [ ] 申込フォームのURLを差し替える（最終CTAが `https://example.com/entry` のまま）
- [ ] og:image（1200×630）を作って `images/` に置き、絶対URLで指定する
- [ ] 講師写真を用意して `.face` を `<img>` に置き換える
- [ ] 実機（スマホ実端末）で縦組みヒーローの見え方を確認する
- [ ] Lighthouse でパフォーマンス／アクセシビリティを計測する

## 再開のしかた

```powershell
cd 'C:\Users\takut\lp制作-AIの学校演習'
git pull
```

そのうえで Claude Code に「PROGRESS.md を読んで続きから」と伝える。
