import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Vitaledge",
  description: "Vitaledgeのプライバシーポリシーです。",
};

const sections = [
  {
    title: "1. 取得する情報",
    body: "当社は、お問い合わせ時にご提供いただく会社名、氏名、メールアドレス、電話番号、相談内容など、サービス提供に必要な範囲の情報を取得します。",
  },
  {
    title: "2. 利用目的",
    body: "取得した情報は、お問い合わせへの回答、サービスの案内、商談・契約手続き、サービス改善、法令に基づく対応のために利用します。",
  },
  {
    title: "3. 第三者提供",
    body: "当社は、法令に基づく場合または本人の同意がある場合を除き、取得した個人情報を第三者に提供しません。",
  },
  {
    title: "4. 安全管理",
    body: "当社は、個人情報の漏えい、滅失、毀損を防止するため、適切な安全管理措置を講じます。",
  },
  {
    title: "5. 開示・訂正・利用停止",
    body: "ご本人から個人情報の開示、訂正、利用停止等の請求があった場合、法令に従い適切に対応します。",
  },
  {
    title: "6. お問い合わせ",
    body: "本ポリシーに関するお問い合わせは、info@wdlab.jp までご連絡ください。",
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <nav className="mb-8 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          トップ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">プライバシーポリシー</span>
      </nav>

      <h1 className="mb-4">プライバシーポリシー</h1>
      <p className="text-base text-muted-foreground leading-relaxed mb-10">
        株式会社WDL（以下「当社」といいます）は、Vitaledgeの提供にあたり取得する個人情報を、以下の方針に基づき適切に取り扱います。
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
