import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/legal-document";
import { legalDocuments } from "@/data/legal-documents";

export const metadata: Metadata = {
  title: "利用規約 | Vitaledge",
  description: "Vitaledgeの利用規約です。",
};

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

      <LegalDocument
        title={legalDocuments.terms.title}
        body={legalDocuments.terms.body}
      />
    </div>
  );
}
