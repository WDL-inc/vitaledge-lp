import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "利用規約 | Vitaledge",
  description: "Vitaledgeの利用規約です。",
};

const sections = [
  {
    title: "1. 適用",
    body: "本規約は、株式会社WDLが提供するVitaledgeに関する情報提供、お問い合わせ、相談受付その他関連サービスの利用に適用されます。",
  },
  {
    title: "2. サービス内容",
    body: "当社は、法人向けウェルネスサービス、労災二次健診等に関する情報提供および相談機会を提供します。具体的な提供条件は、個別の契約または合意により定めます。",
  },
  {
    title: "3. 禁止事項",
    body: "利用者は、虚偽情報の送信、第三者の権利侵害、法令または公序良俗に反する行為、当社サービスの運営を妨げる行為を行ってはなりません。",
  },
  {
    title: "4. 免責",
    body: "当サイト上の情報は一般的な情報提供を目的とするものであり、医療上の診断、治療、助言を代替するものではありません。個別の健康状態については医師等の専門家にご相談ください。",
  },
  {
    title: "5. 規約の変更",
    body: "当社は、必要に応じて本規約を変更することがあります。変更後の規約は、当サイトに掲載した時点から効力を生じます。",
  },
  {
    title: "6. 準拠法・管轄",
    body: "本規約は日本法に準拠し、本サービスに関して紛争が生じた場合は、東京地方裁判所を第一審の専属的合意管轄裁判所とします。",
  },
];

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <nav className="mb-8 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          トップ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">利用規約</span>
      </nav>

      <h1 className="mb-4">利用規約</h1>
      <p className="text-base text-muted-foreground leading-relaxed mb-10">
        本規約は、Vitaledgeをご利用いただく際の基本的な条件を定めるものです。
      </p>

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl mb-3">{section.title}</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {section.body}
            </p>
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">制定日: 2026年5月23日</p>
    </div>
  );
}
