import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CaseCard } from "@/components/cases/case-card";
import { getLatestCases } from "@/lib/cases";
import {
  heroStats,
  visitBenefits,
  reasons,
  pricingPlans,
  faqs,
  contactEmail,
  worries,
  worriesSP,
} from "@/data/lp";

// ──────────────────────────────────────────────────────
//  Shared atoms
// ──────────────────────────────────────────────────────

function EyebrowLabel({ children }: { children: string }) {
  return (
    <p className="text-sm md:text-base font-bold text-primary uppercase tracking-[0.18em] mb-3">
      {children}
    </p>
  );
}

// ──────────────────────────────────────────────────────
//  Page
// ──────────────────────────────────────────────────────

export default function TopPage() {
  const latestCases = getLatestCases(4);

  return (
    <>
      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <section className="relative bg-[url('/image/FV.jpg')] bg-cover bg-center overflow-hidden px-6 flex flex-col min-h-[50vh] md:min-h-[75vh] pt-20 md:pt-32">
        {/* 黒オーバーレイ — 背景画像の上に被せて文字を見やすくする */}
        <div className="pointer-events-none absolute inset-0 bg-black/60" aria-hidden />

        {/* メインコピー */}
        <div className="relative flex-1 max-w-5xl mx-auto w-full flex flex-col justify-center pb-16 md:pb-24">
          <p className="text-white text-xl font-medium mb-4 leading-snug">
            メディカルウェルネスプラットフォームバイタレッジで
          </p>
          <h1 className="text-white font-bold leading-[1.15] tracking-tight mb-8 text-[clamp(2.5rem,5vw,4rem)]">
            オフィス訪問型「無料」の
            <br className="hidden md:block" />
            心・脳健診サービス
          </h1>
          <Link
            href="#contact"
            className="self-start inline-flex items-center gap-2 bg-primary text-white font-bold px-7 py-3.5 rounded-md text-sm hover:-translate-y-0.5 transition-all duration-200"
          >
            無料相談はこちらから →
          </Link>
        </div>

        {/* STATS BAR — 同一背景の上に配置 */}
        <div className="relative border-t border-white/20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3">
            {heroStats.map(({ value, label, note }) => (
              <div key={label} className="py-6 md:px-10 first:md:pl-0 last:md:pr-0">
                <p className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-0.5">{value}</p>
                <p className="text-sm font-medium text-white/80 mb-0.5">{label}</p>
                <p className="text-xs text-white/50 leading-snug">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SUB-HERO
      ════════════════════════════════════════════════════ */}
      <section id="service" className="bg-warm-50 px-6 py-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[auto_1fr] gap-8 items-center">
          <div className="md:pr-10 md:border-r md:self-stretch border-border shrink-0 flex items-center">
<h2 className="text-3xl font-bold text-foreground leading-snug tracking-tight">
              法人向け訪問型<br className="hidden md:block" />二次健康診断って？
            </h2>
          </div>
          <p className="text-base text-foreground leading-[1.9] tracking-[0.01em]">
            従業員の皆さんの健康を強力にサポートするために開発された全額負担なしの健診サービス。
            会議室訪問型で短時間で手軽に健康チェックを受けられる仕組みを実現。
            専門の医療スタッフが定期健康診断では見つかりにくい疾病やリスクの早期発見・予防に努めます。
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          導入事例
      ════════════════════════════════════════════════════ */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
<h2>導入事例</h2>
          </div>

          {/* SP: 横スクロールカード（section の px-6 を打ち消して全幅スクロール） */}
          <div className="-mx-6 flex gap-5 overflow-x-auto pr-6 pb-2 snap-x snap-mandatory sm:hidden">
            {latestCases.map((c, i) => (
              <div key={c.slug} className={`min-w-[80vw] snap-start${i === 0 ? " pl-6" : ""}`}>
                <CaseCard caseStudy={c} />
              </div>
            ))}
          </div>

          {/* PC: 個別カード */}
          <div className="hidden sm:flex flex-col gap-3">
            {latestCases.map((c) => (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="flex items-stretch bg-card border border-warm-200/60 rounded-xl group overflow-hidden"
              >
                <div className="w-40 aspect-video bg-warm-100 shrink-0 overflow-hidden">
                  <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1 px-5 flex flex-col justify-center">
                  <p className="text-xs text-foreground mb-1">{c.industry}</p>
                  <p className="text-base font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1 leading-snug">
                    {c.title}
                  </p>
                  <p className="text-xs text-foreground mt-1">{c.client}</p>
                </div>
                <svg className="w-4 h-4 text-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mr-5 self-center" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/cases"
              className="inline-flex items-center gap-1.5 text-base text-primary font-medium hover:underline underline-offset-4"
            >
              すべての導入事例を見る
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          課題提起（ホラーストーリー）
      ════════════════════════════════════════════════════ */}
      <section className="bg-foreground px-6 py-20 md:py-28 overflow-hidden relative">

        <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* 左：テキスト */}
          <div>
            <h2 className="text-white font-bold leading-[1.15] tracking-tight mb-10"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}>
              「生活習慣病」という、ある日突然重症を引き起こす<span className="text-brand-400">&ldquo;サイレントキラー&rdquo;</span>
            </h2>
            <p className="text-white/70 text-base leading-[1.95]">
              生活習慣病はある日突然、脳梗塞や心筋梗塞を引き起こすことから、サイレントキラーと呼ばれています。毎年の労災二次健診で「動脈硬化の進行程度」を把握することが従業員様の生活習慣病への行動変容につなげるきっかけとなります。従業員様の能動的な生活習慣病リスクの可視化・ケアに寄り添います。
            </p>
          </div>

          {/* 右：リスク可視化グラフィック */}
          <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-white/[0.04] border border-white/[0.08] shadow-lg shadow-black/20">
            <img
              src="/image/silent-killer-graphic.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          バイタレッジ解決
      ════════════════════════════════════════════════════ */}
      <section className="bg-background px-6 pt-20 md:pt-24 pb-8">
        <div className="max-w-5xl mx-auto">

          {/* SP: フレックスラップ ピル */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 md:hidden">
            {worriesSP.map((text) => (
              <div key={text} className="bg-brand-500 rounded-full px-4 py-2 text-sm font-medium text-white">
                {text}
              </div>
            ))}
          </div>

          {/* PC: 吹き出し（3+2段） */}
          <div className="hidden md:flex flex-col items-center gap-8 mb-6">
            <div className="flex flex-wrap justify-center gap-5">
              {worries.slice(0, 3).map((text) => (
                <div key={text} className="inline-flex flex-col items-center">
                  <div className="bg-brand-500 rounded-2xl px-5 py-3 text-sm font-medium text-white leading-snug text-center">
                    {text}
                  </div>
                  <div className="-mt-[7px] w-3.5 h-3.5 bg-brand-500" style={{ transform: "rotate(45deg)" }} aria-hidden />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              {worries.slice(3).map((text) => (
                <div key={text} className="inline-flex flex-col items-center">
                  <div className="bg-brand-500 rounded-2xl px-5 py-3 text-sm font-medium text-white leading-snug text-center">
                    {text}
                  </div>
                  <div className="-mt-[7px] w-3.5 h-3.5 bg-brand-500" style={{ transform: "rotate(45deg)" }} aria-hidden />
                </div>
              ))}
            </div>
          </div>

          {/* 問いかけ */}
          <h2 className="font-bold text-foreground mb-1 text-center">
            こんなお悩みはありませんか
          </h2>

          <h2 className="font-bold text-primary mb-6 text-center" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}>
            バイタレッジのウェルネスプラットフォームが寄り添います
          </h2>
          <p className="text-foreground text-base leading-[1.9] max-w-2xl mx-auto text-center">
            Vitaledgeは指定医療機関との連携を行いながら、従業員様の能動的な生活習慣病リスクの可視化・ケアに寄り添います
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          バイタレッジでできること
      ════════════════════════════════════════════════════ */}
      <section className="px-6 pt-8 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* 訪問実施 */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-6">
            {/* 左：テキスト */}
            <div>
              <p className="text-sm font-bold text-brand-500 uppercase tracking-widest mb-2">
                訪問健診スタイルの採用で企業負担を最小限に
              </p>
              <h3 className="font-bold text-3xl mb-4">
                貴社へ訪問し、労災二次健診を実施します
              </h3>
              <p className="text-base text-foreground leading-[1.9] mb-6">
                従業員の健康を守るために、医療専門チームが貴社を訪問し、職場内で精密健診や健康指導を実施します。
                長時間労働や業務ストレスが原因で健康リスクを抱える従業員も多い中、
                脳・心臓疾患の予防と早期発見を目的としています。
              </p>
              <ul className="space-y-3">
                {visitBenefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-foreground">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* 右：画像 */}
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden">
              <img src="/image/visit.png" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          選ばれる理由（バイタレッジのウェルネスプラットフォームが寄り添います）
      ════════════════════════════════════════════════════ */}
      <section id="features" className="bg-warm-100 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <EyebrowLabel>ウェルネスプラットフォーム</EyebrowLabel>
            <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}>バイタレッジが選ばれる理由</h2>
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
              {["無料の提供", "早期予防/発見", "医療機関との連携"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="text-xl font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <h3 className="font-bold text-2xl mt-8">従業員の健康リスクケアをサポートするメディカルウェルネスプラットフォーム</h3>
            <p className="text-base text-foreground leading-[1.9] mt-3">
              会議室訪問型で短時間で手軽に生活習慣リスクのチェックを受けられる仕組みを実現。専門の医療スタッフが定期健康診断では見つかりにくいリスクの早期発見・予防に繋げます。
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {reasons.map(({ point, Icon, title, body, cta }) => (
              <Card key={point} className="bg-card ring-0 border border-warm-200/60 transition-colors duration-200 group">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* 左：コピー */}
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-bold text-brand-500 uppercase tracking-[0.15em]">
                        {point}
                      </p>
                      <h3 className="font-bold text-3xl leading-snug">{title}</h3>
                      <p className="text-base text-foreground leading-relaxed">{body}</p>
                    </div>
                    {/* 右：画像 */}
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-warm-100 border border-warm-200">
                      <img src={`/image/${point}.png`} alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ご利用料金
      ════════════════════════════════════════════════════ */}
      <section id="pricing" className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
<h2>ご利用料金</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-x-4 gap-y-4 md:[grid-template-rows:auto_auto_auto_auto_1px_1fr]">
            {pricingPlans.map(({ label, name, price, priceNote, cta, features, highlight }) => (
              <div
                key={label}
                className={`flex flex-col md:row-span-6 md:grid md:grid-rows-subgrid rounded-2xl overflow-hidden border border-warm-200/60 ${highlight ? "bg-brand-50" : "bg-card"}`}
              >
                {/* ラベル */}
                <div className="px-6 pt-6">
                  <p className="text-sm font-bold uppercase tracking-widest text-foreground">
                    {label}
                  </p>
                </div>
                {/* プラン名 */}
                <div className="px-6 pt-3">
                  <p className={`font-bold leading-snug ${highlight ? "text-brand-600 text-lg" : "text-foreground text-base"}`}>
                    {name}
                  </p>
                </div>
                {/* 価格 */}
                <div className="px-6 pt-3">
                  <span className={`font-bold leading-none ${highlight ? "text-5xl" : "text-3xl"} text-foreground`}>
                    {price}
                  </span>
                  {priceNote && (
                    <span className="text-sm text-foreground ml-2">{priceNote}</span>
                  )}
                </div>
                {/* CTA */}
                <div className="px-6 pt-4">
                  <Link
                    href="#contact"
                    className={`block w-full text-center font-semibold text-sm px-4 py-3 rounded-lg transition-opacity duration-200 hover:opacity-90 cursor-pointer ${
                      cta.primary
                        ? "bg-primary text-primary-foreground"
                        : "bg-warm-100 text-foreground border border-warm-200"
                    }`}
                  >
                    {cta.label}
                  </Link>
                </div>
                {/* 区切り */}
                <div className="border-t border-warm-200/60 mt-4" />
                {/* フィーチャーリスト */}
                <div className="px-6 pt-4 pb-6">
                  <ul className="space-y-3">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className="text-sm text-foreground leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          CTA① — まずは気軽にご相談ください
      ════════════════════════════════════════════════════ */}
      <section id="contact" className="relative bg-brand-50 px-6 py-20 text-center overflow-hidden">
        <div className="max-w-xl mx-auto">
          <h2 className="font-bold mb-4">まずは気軽にご相談ください</h2>
          <p className="text-foreground text-base leading-[1.9] mb-8">
            基本は費用負担ゼロで導入いただけますが、詳細に関しては相談会にてご説明させていただきます。
            下記からご予約いただければ、担当者からご連絡いたします。
          </p>
          <Link
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-md text-sm hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            無料相談はこちらから →
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════ */}
      <section id="faq" className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h2>よくある質問</h2>
          </div>
          <Accordion
            multiple={false}
            className="border border-warm-200/60 rounded-xl overflow-hidden bg-card"
          >
            {faqs.map(({ q, a }, i) => (
              <AccordionItem key={i} value={String(i)}>
                <AccordionTrigger className="px-6 py-5 hover:bg-warm-50 hover:no-underline transition-colors duration-150 gap-4">
                  <div className="flex items-start gap-3 text-left">
                    <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="font-semibold text-base text-foreground leading-snug">{q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-6 pb-5">
                    <p className="pl-9 text-base text-foreground leading-[1.85]">{a}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CTA② — 無料相談のお申し込み
      ════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 text-center bg-brand-500">
        <div className="max-w-xl mx-auto">
<h2 className="text-white font-bold mb-4">無料相談のお申し込み</h2>
          <p className="text-white/80 text-base leading-[1.9] mb-8">
            基本は費用負担ゼロで導入いただけますが、詳細に関しては相談会にてご説明させていただきます。
            下記からご予約いただければ、担当者からご連絡いたします。
          </p>
          <Link
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-md text-sm hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            無料相談はこちらから →
          </Link>
        </div>
      </section>
    </>
  );
}
