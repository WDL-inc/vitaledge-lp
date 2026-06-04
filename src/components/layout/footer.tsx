"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const companyInfo = {
  name: "株式会社WDL",
  nameEn: "WDL inc",
  established: "2025年3月",
  capital: null,
  ceo: "藤沼 拓巳",
  address: "東京都港区六本木7-7-7 トライセブンロッポンギ8F",
  tel: null,
  email: "info@wdlab.jp",
  business: "法人向けウェルネスサービスの企画・開発・運営 / 医療機関向けDX支援 / デジタル・AI活用に関するコンサルティング・プロダクト開発支援",
};

const serviceLinks = [
  { label: "Vitaledgeについて", href: "/#service" },
  { label: "サービス概要", href: "/#service" },
  { label: "導入メリット", href: "/#features" },
  { label: "サービスの特徴", href: "/#features" },
  { label: "ご利用料金", href: "/#pricing" },
  { label: "よくある質問", href: "/#faq" },
  { label: "提携クリニック", href: "/#clinic" },
];

export function Footer() {
  return (
    <footer className="bg-brand-gradient mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr] gap-10">
          {/* ロゴ */}
          <Link href="/" className="inline-flex items-center self-start">
            <img
              src="/image/logo.svg"
              alt="Vitaledge"
              className="h-6 w-auto brightness-0 invert"
            />
          </Link>

          {/* サービス */}
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">
              サービス
            </p>
            <ul className="space-y-2">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/80 hover:text-white transition-colors underline underline-offset-2 decoration-white/30 hover:decoration-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* その他 */}
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">
              その他
            </p>
            <ul className="space-y-2">
              {[
                { label: "お問い合わせ", href: "/#contact" },
                { label: "利用規約", href: "/terms" },
                { label: "プライバシーポリシー", href: "/privacy" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/80 hover:text-white transition-colors underline underline-offset-2 decoration-white/30 hover:decoration-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}

              {/* 運営会社情報 — Dialog */}
              <li>
                <Dialog>
                  <DialogTrigger className="text-sm text-white/80 hover:text-white transition-colors underline underline-offset-2 decoration-white/30 hover:decoration-white text-left">
                    運営会社情報
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-base">運営会社情報</DialogTitle>
                    </DialogHeader>
                    <div className="mt-2">
                      <table className="w-full text-base">
                        <tbody>
                          {[
                            ["会社名", companyInfo.name],
                            ["英文社名", companyInfo.nameEn],
                            ["設立", companyInfo.established],
                            ["代表者", companyInfo.ceo],
                            ["所在地", companyInfo.address],
                            ["連絡先", companyInfo.email],
                            ["事業内容", companyInfo.business],
                          ].map(([label, value]) => (
                            <tr
                              key={label}
                              className="border-b border-border last:border-0"
                            >
                              <td className="py-2.5 pr-4 text-muted-foreground font-medium whitespace-nowrap w-28 align-top">
                                {label}
                              </td>
                              <td className="py-2.5 text-foreground leading-relaxed">
                                {value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* コピーライト — 画面幅いっぱいのdivider */}
      <div className="border-t border-white/20 py-5 text-center">
        <p className="text-xs text-white/60">
          © Copyright vitaledge
        </p>
      </div>
    </footer>
  );
}
