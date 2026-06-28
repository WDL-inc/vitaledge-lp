import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CaseCard } from "@/components/cases/case-card";
import { casesEnabled } from "@/config/features";
import {
  getCaseBySlug,
  getAllCaseSlugs,
  getRelatedCases,
} from "@/lib/cases";
import type { Metadata } from "next";
import type { ReactNode } from "react";

function renderInlineLinks(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const linkPattern = /\[([^\]]+)\]\(([^)]*)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    const [fullMatch, label, href] = match;
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));

    if (href) {
      parts.push(
        <Link key={`${label}-${match.index}`} href={href}>
          {label}
        </Link>
      );
    } else {
      parts.push(label);
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return parts;
}

function renderMarkdownBlock(block: string, index: number) {
  const trimmed = block.trim();

  if (!trimmed || trimmed === "---") return null;

  const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imageMatch) {
    const [, alt, src] = imageMatch;
    return (
      <figure key={index} className="my-8 overflow-hidden rounded-xl border border-border bg-warm-100">
        <img src={src} alt={alt} className="h-auto w-full object-cover" />
      </figure>
    );
  }

  if (trimmed.startsWith("## ")) {
    return (
      <h2 key={index} className="mt-10 mb-3 text-xl font-bold text-foreground">
        {trimmed.replace(/^## /, "")}
      </h2>
    );
  }

  if (trimmed.startsWith("### ")) {
    return (
      <h3 key={index} className="mt-8 mb-2 text-lg font-semibold text-foreground">
        {trimmed.replace(/^### /, "")}
      </h3>
    );
  }

  if (trimmed.startsWith("# ")) {
    return (
      <p key={index} className="mb-4 text-lg font-semibold text-foreground">
        {trimmed.replace(/^# /, "")}
      </p>
    );
  }

  if (trimmed.startsWith("> ")) {
    const quote = trimmed
      .split("\n")
      .map((line) => line.replace(/^>\s?/, ""))
      .join("\n");

    return (
      <blockquote key={index} className="my-6 rounded-r-lg border-l-4 border-brand-400 bg-brand-50 px-6 py-4">
        {quote.split("\n").map((line, lineIndex) => (
          <p key={lineIndex} className="text-base leading-relaxed text-foreground">
            {renderInlineLinks(line)}
          </p>
        ))}
      </blockquote>
    );
  }

  if (trimmed.startsWith("- ")) {
    return (
      <ul key={index} className="mb-6 list-disc space-y-2 pl-6">
        {trimmed.split("\n").map((item) => (
          <li key={item}>{renderInlineLinks(item.replace(/^-\s+/, ""))}</li>
        ))}
      </ul>
    );
  }

  const ctaMatch = trimmed.match(/^\[([^\]]+)\]\(([^)]*)\)$/);
  if (ctaMatch?.[2]) {
    return (
      <p key={index} className="my-8">
        <Link
          href={ctaMatch[2]}
          className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {ctaMatch[1]} →
        </Link>
      </p>
    );
  }

  return (
    <p key={index} className="mb-4">
      {renderInlineLinks(trimmed)}
    </p>
  );
}

// ── Static generation ──────────────────────────────────────────
// Next.js 16: generateStaticParams に変更なし
export function generateStaticParams() {
  if (!casesEnabled) return [];

  return getAllCaseSlugs();
}

// ── Metadata ───────────────────────────────────────────────────
// Next.js 16: params は Promise
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  if (!casesEnabled) {
    return { title: "ページが見つかりません | Vitaledge" };
  }

  const { slug } = await params;
  const caseStudy = getCaseBySlug(slug);
  if (!caseStudy) return { title: "事例が見つかりません | Vitaledge" };

  return {
    title: `${caseStudy.title} | Vitaledge 導入事例`,
    description: caseStudy.summary,
  };
}

// ── Page ───────────────────────────────────────────────────────
// Next.js 16: params は Promise。await で取り出す
export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!casesEnabled) notFound();

  const { slug } = await params;
  const caseStudy = getCaseBySlug(slug);

  if (!caseStudy) notFound();

  const related = getRelatedCases(caseStudy, 3);

  const publishedDate = new Date(caseStudy.publishedAt).toLocaleDateString(
    "ja-JP",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          トップ
        </Link>
        <span>/</span>
        <Link href="/cases" className="hover:text-primary transition-colors">
          導入事例
        </Link>
        <span>/</span>
        <span className="text-foreground line-clamp-1 max-w-[200px]">
          {caseStudy.client}
        </span>
      </nav>

      <div className="grid lg:grid-cols-[1fr_280px] gap-10">
        {/* ── Main content ── */}
        <article>
          {/* Title */}
          <h1 className="mb-4">{caseStudy.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-base text-muted-foreground mb-6">
            <span className="font-medium text-foreground">
              {caseStudy.client}
            </span>
            <span>{caseStudy.employeeCount}</span>
            <time dateTime={caseStudy.publishedAt}>{publishedDate} 公開</time>
          </div>

          {/* Body */}
          <div className="text-muted-foreground leading-relaxed mb-8">
            {caseStudy.body.split("\n\n").map(renderMarkdownBlock)}
          </div>

          {/* Quote */}
          {caseStudy.quote && (
            <blockquote className="my-8 bg-brand-50 border-l-4 border-brand-400 rounded-r-lg px-6 py-5">
              <p className="text-base font-medium text-foreground leading-relaxed mb-3">
                &ldquo;{caseStudy.quote.text}&rdquo;
              </p>
              <footer className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {caseStudy.quote.author}
                </span>
                &ensp;{caseStudy.quote.role}
              </footer>
            </blockquote>
          )}

          {/* Back link */}
          <div className="mt-10 pt-8 border-t border-border">
            <Link
              href="/cases"
              className="text-base text-primary hover:underline underline-offset-2 transition-colors"
            >
              ← 導入事例一覧に戻る
            </Link>
          </div>
        </article>

        {/* ── Sidebar ── */}
        <aside>
          <Card className="bg-brand-gradient border-0 text-white">
            <CardContent className="pt-5 pb-5 space-y-3">
              <p className="font-semibold text-base">同じ課題を抱えていますか？</p>
              <p className="text-base text-white/80 leading-relaxed">
                Vitaledgeが貴社の健康管理を改善する方法をご提案します。
              </p>
              <a
                href="/#contact"
                className="block w-full text-center bg-white text-primary font-semibold text-sm py-2.5 rounded-md hover:bg-white/90 transition-colors"
              >
                無料で相談する
              </a>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* ── Related cases ── */}
      {related.length > 0 && (
        <section className="mt-16 pt-10 border-t border-border">
          <h2 className="text-xl mb-6">関連する導入事例</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((c) => (
              <CaseCard key={c.slug} caseStudy={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
