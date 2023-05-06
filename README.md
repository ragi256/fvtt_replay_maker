# TRPG Replay Maker

TRPGのログからリプレイ動画を半自動で作成します。

1. 前処理 (`/preprocess`)
2. 音声合成 (`/speech_synthesis`)
3. 動画生成 (`/generate_movie`)

すべてローカルのCLIでのバッチ実行を前提としています。

## 前処理

- Text形式のTRPGログファイルをJSON形式のデータへ変換
- DenoでTypeScriptを実行

## 音声合成

- 前処理で変換したJSONデータに含まれる台詞を音声合成する
- VOICEVOX APIを利用
- DenoでTypeScriptを実行

## 動画生成

- JSONと画像や音声といった素材データを元に動画をリプレイ動画を作成
- 前処理で加工したJSONを事前に手動で編集し、シーンの切り替えなどは指定
- Node.jsでRemotionを利用