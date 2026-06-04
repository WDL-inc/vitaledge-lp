import Link from "next/link";
import { type CaseStudy } from "@/data/cases";

type Props = {
  caseStudy: CaseStudy;
  /** トップページのフィーチャー表示で横長カードにする */
  featured?: boolean;
};

export function CaseCard({ caseStudy, featured = false }: Props) {
  const { slug, title, client, industry, summary, thumbnail, publishedAt } =
    caseStudy;

  const formattedDate = new Date(publishedAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
  });

  if (featured) {
    return (
      <Link
        href={`/cases/${slug}`}
        className="group grid md:grid-cols-[1fr_auto] gap-6 bg-card border border-border rounded-xl hover:border-brand-300 transition-colors overflow-hidden"
      >
        {/* アイキャッチ */}
        <div className="md:hidden h-44 bg-warm-100 overflow-hidden">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-3 p-6">
          <p className="text-xs text-muted-foreground font-medium">{industry}</p>
          <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed line-clamp-2">
            {summary}
          </p>
          <p className="text-xs text-muted-foreground font-medium">{client}</p>
        </div>

        {/* アイキャッチ（PC） */}
        <div className="hidden md:block w-48 bg-warm-100 shrink-0 overflow-hidden">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link
      href={`/cases/${slug}`}
      className="group flex flex-col bg-card border border-border rounded-xl hover:border-brand-300 transition-colors h-full overflow-hidden"
    >
      {/* アイキャッチ */}
      <div className="h-44 bg-warm-100 overflow-hidden">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-xs text-muted-foreground font-medium mb-3">{industry}</p>

        {/* Title */}
        <h3 className="font-bold text-base leading-snug group-hover:text-primary transition-colors mb-3 flex-1">
          {title}
        </h3>

        {/* Summary */}
        <p className="text-base text-muted-foreground leading-relaxed line-clamp-3 mb-5">
          {summary}
        </p>

        {/* Client + date */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <p className="text-xs text-muted-foreground font-medium">{client}</p>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
    </Link>
  );
}
