import { CaseCard } from "@/components/cases/case-card";
import { casesEnabled } from "@/config/features";
import { getAllCases } from "@/lib/cases";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "導入事例 | Vitaledge",
  description:
    "Vitaledgeを導入した企業の事例をご紹介します。産業医紹介・メンタルヘルスケア・健康診断管理の実績をご覧ください。",
};

export default function CasesPage() {
  if (!casesEnabled) redirect("/");

  const cases = getAllCases();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="mb-3">導入事例</h1>
        <p className="text-muted-foreground max-w-xl">業種・規模を問わず、多くの企業がVitaledgeで健康管理体制を変えています。課題と解決策を詳しくご覧ください。</p>
      </div>

      {/* Cases grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cases.map((c) => (
          <CaseCard key={c.slug} caseStudy={c} />
        ))}
      </div>

    </div>
  );
}
