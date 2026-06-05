// LP コンテンツデータ
// このファイルを編集することでサイトのテキスト・項目を更新できます。
// UI ロジックは src/app/page.tsx / src/components/layout/footer.tsx を参照。

import { CheckCircle, Activity, Star, type LucideIcon } from "lucide-react";

// ─── お悩み吹き出し ──────────────────────────────────────
export const worries = [
  "喫煙率が高い",
  "ある日突然従業員が倒れた経験がある",
  "先進的な健康経営の取り組みを実施したい",
  "同じ姿勢での業務時間が長い",
  "人的資本開示の内容",
] as const;

export const worriesSP = [
  "同じ姿勢での業務",
  "先進的な健康経営の実施",
  "突然従業員が倒れた",
  "高い喫煙率",
] as const;

// ─── Hero ───────────────────────────────────────────────
export const heroStats = [
  {
    value: "¥0",
    label: "企業・従業員の費用負担",
    note: "国の給付制度を活用",
  },
  {
    value: "58.3%",
    label: "定期健診の有所見者率",
    note: "脳・心臓疾患リスク（厚労省 令和4年度）",
  },
  {
    value: "1,304件",
    label: "年間の過労死等認定件数",
    note: "脳・心臓疾患（令和4年度）",
  },
] as const;

// ─── サービスフロー ────────────────────────────────────
export const serviceFlow = [
  { label: "従業員の毎年の定期健康診断", highlight: false },
  { label: "定期健康診断結果の専門医レビュー", highlight: true },
  { label: "二次健診の訪問診断", highlight: true },
  { label: "健診結果のご共有", highlight: true },
  { label: "次の定期健康診断", highlight: false },
] as const;

export const visitBenefits = [
  "従業員様の来院負担とそれによる時間給分コストの軽減",
  "御社にて実施するため、従業員の受診率向上が見込める",
] as const;

export type Reason = {
  point: string;
  Icon: LucideIcon;
  title: string;
  body: string;
  cta: { label: string; href: string; primary: boolean } | null;
};

// ─── 選ばれる理由 ────────────────────────────────────
export const reasons: Reason[] = [
  {
    point: "POINT1",
    Icon: CheckCircle,
    title: "企業/従業員の費用負担0にて健診が実施できます*",
    body: "オフィス訪問型で受診ハードルを最小限に抑えます。",
    cta: { label: "無料相談", href: "#contact", primary: true },
  },
  {
    point: "POINT2",
    Icon: Activity,
    title: "要精密検査未満の小さな兆しを見つける健診です",
    body: "早い段階でリスクを可視化し、健康習慣づくりをサポートします。",
    cta: null,
  },
  {
    point: "POINT3",
    Icon: Star,
    title: "指定医療機関とのマッチングにより安心の健診を実施",
    body: "福利厚生や健康施策の外部発信でも活用いただけます。",
    cta: null,
  },
];

// ─── 料金プラン ──────────────────────────────────────
export const pricingPlans = [
  {
    label: "ご利用料金",
    name: "完全無料",
    price: "¥0",
    priceNote: "企業・従業員ともに",
    cta: { label: "無料相談 →", primary: true },
    features: [
      "定期健康診断結果の専門医レビュー",
      "当日の専門医診察",
      "二次健診結果の送付",
      "血液検査：血糖、脂質、HbA1c（糖尿病重症度）",
      "頸動脈エコー検査：動脈硬化の重症度を調べます",
      "心臓エコー検査：心臓機能の異常を調べます",
      "耳検査※対象者のみの検査です",
      "特定保健指導※生活習慣についてアドバイスを行います",
    ],
    highlight: true,
  },
  {
    label: "オプション1",
    name: "定期健康診断に関する業務オペレーション支援",
    price: "お気軽にご相談ください",
    priceNote: null,
    cta: { label: "詳細はご相談ください →", primary: false },
    features: ["デジタルやAIを活用した自動化と業務フロー設計等"],
    highlight: false,
  },
  {
    label: "オプション2",
    name: "産業医派遣",
    price: "お気軽にご相談ください",
    priceNote: null,
    cta: { label: "詳細はご相談ください →", primary: false },
    features: ["貴社の人材課題に合わせた産業医のご紹介などを行います"],
    highlight: false,
  },
] as const;

// ─── FAQ ─────────────────────────────────────────────
export const faqs = [
  {
    q: "名称に労災とあるが、労災保険を使うことになりますか？",
    a: "労災保険は使いません。労働局が実施している突然死を予防するための制度の名称が「労災二次健診」です。支払い保険料が上がるということもありません。",
  },
  {
    q: "役員も健診を受けられますか？",
    a: "役員は労災の対象者ではないので、給付制度にて健診を受けることができません。兼務役員でのご希望の場合は別途ご相談となります。特別加入者の方も同様です。",
  },
  {
    q: "他府県にある支店、営業所でも実施可能ですか？",
    a: "実施地域や人数や場所等にもよりますが、基本的に実施可能です。ご相談ください。",
  },
  {
    q: "パートやアルバイトでも労災二次健診を受診することは可能ですか？",
    a: "労災保険に加入しており、法定健診を受けておられる方であれば可能です。",
  },
  {
    q: "健診を受ける最低人数はありますか？",
    a: "概ね10名程度でスケジューリングをお願いしております。下回る場合でもなるべく実施できるよう努めます。",
  },
] as const;

// ─── 会社情報（フッター） ─────────────────────────────
export const companyInfo = {
  name: "株式会社WDL",
  nameEn: "WDL inc",
  established: "2025年3月",
  ceo: "藤沼 拓巳",
  address: "東京都港区六本木7-7-7 トライセブンロッポンギ8F",
  email: "info@wdlab.jp",
  business:
    "法人向けウェルネスサービスの企画・開発・運営 / 医療機関向けDX支援 / デジタル・AI活用に関するコンサルティング・プロダクト開発支援",
} as const;

export const footerServiceLinks = [
  { label: "Vitaledgeについて", href: "/#service" },
  { label: "サービス概要", href: "/#service" },
  { label: "導入メリット", href: "/#features" },
  { label: "サービスの特徴", href: "/#features" },
  { label: "ご利用料金", href: "/#pricing" },
  { label: "よくある質問", href: "/#faq" },
  { label: "提携クリニック", href: "/#clinic" },
] as const;

export const footerOtherLinks = [
  { label: "お問い合わせ", href: "/#contact" },
  { label: "利用規約", href: "/terms" },
  { label: "プライバシーポリシー", href: "/privacy" },
] as const;

// ─── お問い合わせ ────────────────────────────────────
export const contactEmail = "info@wdlab.jp";
