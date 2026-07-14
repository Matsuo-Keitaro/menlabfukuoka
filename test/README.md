# Handoff: メンタルヘルスラボの訪問看護 福岡 - ランディングページ

## Overview

福岡地域で精神疾患を抱える方とそのご家族に向けた訪問看護サービスのランディングページです。サービスの理解促進から問い合わせ獲得までを目的とし、やさしいグリーン系のパステルトーンで「安心感・寄り添い」を表現しています。

**主要な目的:**
- 訪問看護サービスの認知拡大
- 「悩みが訪問看護で解決できる」という理解の醸成
- お問い合わせ・LINE相談への誘導（CVR最適化）

## About the Design Files

このバンドルに含まれるファイルは、**HTMLで作成されたデザインリファレンス**です。意図する見た目・レイアウト・動作を示すプロトタイプであり、そのままプロダクションで使うためのコードではありません。

実装タスクは、これらのHTMLデザインを **対象コードベースの既存環境（React / Next.js / Vue / Nuxt / Astro / WordPress など）内で、その環境で確立されたパターンやライブラリを使って再現すること** です。まだ環境が決まっていない場合は、プロジェクトに最適なフレームワークを選定して実装してください。SEO・OGP対応やCMS連携が想定されるため、**Next.js または Astro を推奨** します。

## Fidelity

**High-fidelity (hifi)** — 最終的な配色・タイポグラフィ・余白・アニメーションまで確定したピクセルパーフェクトのモックアップです。開発者は、対象コードベースの既存ライブラリとパターンを使ってこのUIをピクセル単位で再現してください。

**編集機能について:**
デザイン内には「Tweaks パネル」というオンライン編集機能のプロトタイプが含まれていますが、これは**制作段階のプレビュー用途**です。実装時は用途に応じて次のいずれかを選択してください：
- **静的サイトとして実装**（Tweaks 機能は不要）
- **CMS 連携**（microCMS / Contentful / WordPress ヘッドレス等でテキスト・画像・カラー変数を管理）

## Screens / Views

### 1. ヘッダー（sticky）

- **Layout**: フルワイド、`position: sticky; top: 0;`、背景 `rgba(255,250,241,0.92)` に `backdrop-filter: blur(12px)`
- **Components**:
  - **ブランドマーク**: 44×44px の丸型、緑 `#5a9d66`、絵文字 🌱（実装時は SVG ロゴに差し替え推奨）
  - **サービス名**: `Zen Maru Gothic` 700, 15px, `#386c42`
  - **英語サブテキスト**: 11px, ミュートグレー
  - **ナビゲーション**: 14px, 600, 6項目（お悩み / サービス / 利用者の声 / 選ばれる理由 / 流れ / FAQ）
  - **CTA ボタン**: `#5a9d66` 背景、白文字、丸型（radius 999px）、14px 700
- **レスポンシブ**: 900px 以下でナビと CTA を非表示、ハンバーガーメニュー表示

### 2. ファーストビュー（Hero）

- **Layout**: 2カラム grid (`1.1fr 1fr`)、`padding: 60px 0 100px`、放射グラデ背景
  - `radial-gradient(circle at 15% 30%, #e3f0e3 0%, transparent 45%)`
  - `radial-gradient(circle at 85% 70%, #f7ecd6 0%, transparent 50%)`
  - ベース `#fffaf1`
- **左カラム コンポーネント**:
  - **タグバッジ**: 白背景、緑ボーダー、6×16px、パルスドット付き
  - **見出し**: `clamp(28px, 4.4vw, 48px)`, line-height 1.35, `Zen Maru Gothic` 700
    - 強調部分に `linear-gradient(transparent 60%, #fce8a8 60%)` の下線マーカー
    - グリーン強調ワード `#488a54`
  - **リード文**: 16px, `#55655c`, max-width 520px
  - **CTA 群**: プライマリ（緑）+ LINE（`#06c755`）
  - **クイックチェック**: ✓アイコン + テキスト（3項目）
- **右カラム（ビジュアル）**:
  - **メイン画像**: 有機的なブロブシェイプ `border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%`
  - **アニメーション**: 8秒周期でボーダーラディアスを変化させる `blob` アニメーション
  - **フローティングバッジ 3個**: 白背景、シャドウ、5〜6秒の上下フロートアニメーション
- **レスポンシブ**: 900px 以下で 1カラム縦積み

### 3. お悩みセクション（Worry）

- **背景**: `#fef5e6`（クリーム2）
- **Layout**: 3列 × 2行のカードグリッド（gap 20px）
- **カード仕様**:
  - 白背景、`border-radius: 20px`、`box-shadow: 0 2px 8px rgba(56,108,66,0.08)`
  - パディング 28px 22px
  - ホバー時 `translateY(-4px)` + 緑ボーダー
  - アイコンサークル 64×64px（`#f2f8f2` 背景に絵文字 30px）
- **6項目**: お薬 / 対人関係 / 外出困難 / 社会復帰 / 家族の悩み / 睡眠
- **サマリーカード**: 破線ボーダー（緑）、下矢印付き、「そのお悩み、訪問看護で解決できます！」
- **レスポンシブ**: 780px 以下で 2列、500px 以下で 1列

### 4. サービス紹介（Services）

- **Layout**: 2列カードグリッド
- **カード**: `padding: 32px`、ナンバーバッジ（52×52px、緑グラデ）+ 見出し + 本文
- **6項目**: 健康観察 / 服薬管理 / 生活リズム / 就労支援連携 / 家族サポート / 医療機関調整

### 5. 利用者の声（Voice - Before/After）

- **背景**: 緑50→クリームのリニアグラデーション
- **Layout**: カードを縦に3枚（`grid-template-columns: 260px 1fr`）
- **カード**:
  - 白背景、`border-radius: 32px`、`box-shadow: 0 10px 30px rgba(56,108,66,0.12)`
  - 左：180×180px の丸アバター（5px 緑100ボーダー）+ 属性タグ
  - 右：見出し（左に5px緑ボーダー）+ Before ラベル + 矢印 + After ラベル
- **Before ラベル**: `#ffe4d5` 背景、`#c46236` テキスト
- **After ラベル**: `#d8eede` 背景、`#386c42` テキスト
- **強調部分**: 黄色マーカー `linear-gradient(transparent 60%, #fce8a8 60%)`

**掲載する3件の利用者の声（本番コピー確定版）**:

| # | 属性タグ | タイトル (voiceNTitle) | BEFORE (voiceNBefore) | AFTER (voiceNAfter, `<span class="em">` で強調する部分は太字で表記) |
|---|---|---|---|---|
| 1 | 20代女性 / 適応障がい / Fさん | 毎日出勤できなかったFさん | 出勤が週1〜2日できたら多い方。全く出勤できない時は自己嫌悪に陥っていました。 | 自宅からの送出支援により**週3〜4日、遅刻をしてでも出勤できるように。** 職場での不安事や人間関係も看護師へ相談できるようになり、本人の自己肯定感が上がりました。 |
| 2 | 40代男性 / うつ・PTSD / Iさん | 体調予測が難しかったIさん | 月1回の通院の際に担当医へ相談するのみで、体調のことをうまく伝えきれず、どうしたら精神的な波が大きくならないかわからない状態でした。 | 自宅へ看護師が訪問してくれることで、落ち着いて自身の体調の相談ができるようになりました。**現在は内定を3社からいただけています。** |
| 3 | 30代女性 / うつ / Mさん | 生活保護を脱却したいMさん | 精神的な波や食事、服薬の管理などが難しく、また自宅へ引きこもり、外出することもままならない状態でした。 | 福祉サービスを利用して**週4日事業所へ通所できるように**なりました。また、簿記2級の資格取得を目指して奮闘中です。 |

- 実装時は上記コピーをそのまま流し込む前提で構いません。運用途中で入れ替える可能性があるため、CMS 化する場合は「タイトル / BEFORE / AFTER / 属性タグ配列 / アバター画像」を1レコードとしてください。
- 個人特定を避けるためイニシャル表記（F/I/M）+ 年代・性別・症状のみを掲載する運用ルールです。実装時にプレースホルダーへ差し替えないでください。

### 6. 選ばれる理由（Reasons）

- **背景**: 白
- **Layout**: 3列カードグリッド
- **カード**: クリーム背景、ナンバーバッジをカード上部にオーバーレイ（絶対配置、44×44px 緑丸）
- **3項目**: 就労支援連携 / 家族サポート / 精神科看護の専門性

### 7. ご利用の流れ（Flow）

- **背景**: 緑50
- **Layout**: 縦積み（max-width 800px センタリング）
- **ステップカード**:
  - 白背景、`grid-template-columns: 80px 1fr`
  - ナンバーサークル 72×72px（緑グラデ）、`STEP` ラベル + 数字
  - カード間に 3px × 18px の縦線でつなぐ（絶対配置）
- **4ステップ**: 相談 → 主治医連絡 → 面談・計画 → 訪問開始

### 8. 料金（Pricing）

- **Layout**: 中央1カラム（max-width 720px）
- **カード**: 白背景、上部 6px 緑ボーダー、`border-radius: 32px`
- **価格表示**: 42px 緑、「1割〜3割 負担」
- **チェックリスト**: 緑50背景の項目 4個

### 9. 対応エリア（Area）

- **Layout**: 2カラム（1:1）
- **左**: 正方形カード、緑グラデ背景、破線内枠、中央に📍ピン + バウンスアニメ + 白ラベル
- **右**: エリアリスト（緑50背景のチップを flex-wrap で並べる）

### 10. スタッフ紹介（Staff）

- **背景**: 緑50
- **Layout**: 3列カードグリッド
- **カード**: 中央寄せ、140×140px 丸アバター（5px クリーム2ボーダー）、役職 + 名前 + バイオ

### 11. FAQ

- **Layout**: `<details>` タグの手動アコーディオン（max-width 820px）
- **アイテム**: クリーム背景、Q サークル（緑）、開閉時 `+` → `×` に回転
- **6問**

### 12. CTA ブロック

- **背景**: 緑50 + 放射グラデ
- **中央寄せ**: 見出し + リード + 3ボタン（フォーム / 電話 / LINE）

### 13. お問い合わせフォーム（Contact）

- **Layout**: 2カラム（1:1.2）
- **左**: 連絡方法カード 4個（電話 / メール / LINE / 営業時間）
- **右**: フォーム（お名前 / 電話 / メール / 相談内容セレクト / メッセージ / 送信ボタン）
- **フィールド**: `border: 1.5px solid rgba(56,108,66,0.15)`、フォーカス時緑

### 14. フッター

- **背景**: `#2d3d33` (ink)、白文字
- **Layout**: 3カラム（1.5:1:1）
- **内容**: ブランド + 住所 / サービスリンク / お問い合わせリンク

### 15. フローティング CTA

- **位置**: `position: fixed; bottom: 20px; right: 20px;`
- **内容**: 「相談する」+ 「LINE」の2ボタン
- **モバイル**: 画面下部フルワイド（左右12px 余白）

## Interactions & Behavior

### アニメーション

| 要素 | プロパティ | 期間 | イージング |
|---|---|---|---|
| ヒーロータグのドット | `pulse` (scale 1→1.4, opacity 1→0.6) | 2s | ease-in-out infinite |
| ヒーロー画像ブロブ | `blob` (border-radius 変化) | 8s | ease-in-out infinite |
| フローティングバッジ | `float` (translateY 0→-8px) | 5〜6s | ease-in-out infinite |
| エリアピン | `bounce` (translateY 0→-10px) | 2s | ease-in-out infinite |
| カード hover | `translateY(-4px)` + border/shadow 変化 | 0.3s | 標準 |
| ボタン hover | `translateY(-2px)` + shadow 強化 | 0.2s | 標準 |
| FAQ 開閉 | `+` → 45deg 回転 | 0.3s | 標準 |

### スクロール

- `html { scroll-behavior: smooth; }` でナビリンクのスムーズスクロール
- ヘッダーは sticky（`top: 0`）

### フォーム

- **クライアント側バリデーション**: `required` 属性利用
- **送信**: 現状は `onsubmit` で `alert()`、実装時は API エンドポイント（メール送信 / Slack 通知 / DB 保存など）に接続
- **推奨バリデーションルール**:
  - お名前: 必須、1〜50文字
  - 電話番号: 必須、正規表現 `^0\d{9,10}$` またはハイフン許容
  - メール: 任意、標準メール形式
  - 相談内容: 必須、選択
  - メッセージ: 任意、〜2000文字

### レスポンシブブレイクポイント

- `900px` — ヘッダーモバイル化、ヒーロー1カラム化、サービス1カラム化、コンタクト1カラム化
- `780px` — 各カードグリッドを1〜2列に
- `640px` — フローティングCTAを画面下フルワイドに、フローステップも1カラム化
- `500px` — 悩みカードを1列に

## State Management

静的LPのため最小限：

- **フォーム入力の一時保持**（送信前）: React なら `useState`、Vue なら `ref`
- **FAQ アコーディオン**: HTML の `<details>` で状態不要（React 実装時は `useState<Set<number>>` で開閉管理）
- **フローティング CTA の表示制御**（オプション）: スクロール量に応じて表示/非表示切替 → `IntersectionObserver`

CMS 連携する場合は、SSG（getStaticProps / getStaticPaths）でビルド時にコンテンツをフェッチ推奨。

## Design Tokens

### カラー

```css
/* Green scale */
--green-50:  #f2f8f2;
--green-100: #e3f0e3;
--green-200: #c8e0c8;
--green-300: #a8ceac;
--green-400: #7fb587;
--green-500: #5a9d66;  /* Primary */
--green-600: #488a54;
--green-700: #386c42;  /* Deep / heading */

/* Neutrals */
--cream:   #fffaf1;    /* Body background */
--cream-2: #fef5e6;    /* Section alt background */
--sand:    #f7ecd6;
--ink:      #2d3d33;   /* Body text */
--ink-soft: #55655c;   /* Muted text */

/* Accents */
--pink-accent:   #f4a5a5;   /* Form required badge */
--yellow-accent: #f7d97a;   /* Highlight marker (#fce8a8 lighter tone) */
--line: rgba(56, 108, 66, 0.15);

/* LINE brand */
--line-brand: #06c755;
```

### タイポグラフィ

```css
/* Fonts (Google Fonts) */
--font-jp:      "Zen Maru Gothic", "Hiragino Maru Gothic ProN", "Hiragino Sans", sans-serif;
--font-jp-body: "Zen Kaku Gothic New", "Hiragino Sans", "Yu Gothic UI", sans-serif;

/* Weights */
- Zen Maru Gothic: 500, 700, 900
- Zen Kaku Gothic New: 400, 500, 700

/* Sizes */
- Hero h1:        clamp(28px, 4.4vw, 48px), line-height 1.35
- Section title:  clamp(24px, 3.6vw, 36px), line-height 1.4
- Card h3:        18-22px
- Body:           15-16px, line-height 1.75
- Small / caption: 12-13px
```

### スペーシング

```css
/* Section vertical padding */
--section-py-desktop: 90px;
--section-py-mobile:  60px;

/* Container widths */
--container-max:        1120px;
--container-narrow-max: 900px;
--container-padding-x:  24px;

/* Card padding scale */
- Compact card:  24-28px
- Standard card: 32px
- Large card:    40-48px
```

### Border Radius

```css
--radius-sm: 12px;    /* Small chips, form fields */
--radius-md: 20px;    /* Standard cards */
--radius-lg: 32px;    /* Large cards (voice, contact form, pricing) */
--radius-xl: 48px;
--radius-pill: 999px; /* Buttons, tags */
```

### Shadows

```css
--shadow-sm: 0 2px 8px rgba(56, 108, 66, 0.08);
--shadow-md: 0 10px 30px rgba(56, 108, 66, 0.12);
--shadow-lg: 0 20px 50px rgba(56, 108, 66, 0.15);

/* CTA button shadow */
box-shadow: 0 8px 20px rgba(90, 157, 102, 0.35);
```

## Assets

**現状**: すべての画像は `<image-slot>` プレースホルダー（グリーングラデーション + 説明テキスト）で作成されています。実装時に以下の画像を用意してください。

| ID | 用途 | 推奨サイズ | 形状 |
|---|---|---|---|
| `hero-main` | ヒーロービジュアル（訪問看護の様子） | 800×1000px | 有機ブロブシェイプ |
| `voice-avatar-1` | 利用者1（20代女性・適応障がい / Fさん） | 400×400px | 円形 |
| `voice-avatar-2` | 利用者2（40代男性・うつ、PTSD / Iさん） | 400×400px | 円形 |
| `voice-avatar-3` | 利用者3（30代女性・うつ / Mさん） | 400×400px | 円形 |

**アバター画像の実装ノート**:
- `#voice-avatar-1` にはプロトタイプ段階で `style="overflow: visible; margin: 5px; padding: 1px"` のインラインスタイルが付与されています。これは編集セッション中のドラッグ位置調整用の一時スタイルで、**本実装では削除して構いません**。3枚のアバターは同じ 180×180px の円形コンテナに `object-fit: cover; object-position: center` で表示してください。
- 顔が中央に来る画像を選定してください。もし写真が横長で顔が中央から外れる場合は、実装側で `object-position` を調整するか、事前にトリミングしてください。
| `staff-1` `staff-2` `staff-3` | スタッフ写真 3名 | 400×400px | 円形 |

**アイコン**: 現状は絵文字ベース。実装時は SVG アイコンライブラリ（Lucide / Heroicons / 自作）への差し替えを推奨します。

**ロゴ**: 🌱絵文字プレースホルダー。実装時にブランドロゴ SVG に置き換えてください。

**フォント**: Google Fonts の `Zen Maru Gothic` / `Zen Kaku Gothic New` を使用。セルフホストする場合は `next/font` などでの最適化推奨。

## Files

このハンドオフバンドルに含まれるファイル：

- `README.md` — このドキュメント
- `index.html` — メインの LP デザイン（コンポーネント構造の参照用）
- `styles.css` — 全スタイル定義（デザイントークンと各セクションのスタイル）
- `tweaks-app.jsx` — オンライン編集パネルの実装例（プロダクションでは通常不要、CMS 導入時のスキーマ参考として活用可能）

**注意**: `tweaks_panel.jsx` および `image_slot.js` はデザイン制作用のランタイムです。プロダクション実装には含めません。

## 実装ガイドライン

### 推奨技術スタック

- **フレームワーク**: Next.js 14+ (App Router) または Astro 4+
- **スタイリング**: Tailwind CSS（トークンは `tailwind.config.ts` の `theme.extend` に転写）または CSS Modules
- **フォーム**: React Hook Form + Zod、または Astro のフォームアクション
- **お問い合わせ送信**: Resend / SendGrid / SES
- **CMS（オプション）**: microCMS / Contentful / Sanity

### アクセシビリティ

- 見出しの階層（h1→h2→h3）を維持
- フォームラベルとフィールドを `for`/`id` で紐付け（コード生成時に追加）
- CTA ボタンには `aria-label` を明示（絵文字のみのアイコンボタン）
- カラーコントラスト：`#55655c` on `#fffaf1` = 5.7:1（AA 準拠）を維持
- FAQ は `<details>/<summary>` を利用しキーボードアクセス確保

### パフォーマンス

- ヒーロー画像は `priority` / `loading="eager"`、それ以下は `loading="lazy"`
- Google Fonts は `display=swap` 指定
- CSS アニメーション（`transform` / `opacity` のみ）は GPU アクセラレーション済み

### SEO

- `<title>`, `<meta name="description">` は `index.html` 記載を流用
- OG 画像を別途用意（1200×630px 推奨）
- 構造化データ（`LocalBusiness` / `MedicalOrganization`）追加推奨
- サイトマップ + robots.txt

### デプロイ

Genspark AI Developer にハンドオフする場合、そのまま Next.js プロジェクトとして立ち上げ、上記トークンを Tailwind config に転記、各セクションを React コンポーネントに分割してください。
