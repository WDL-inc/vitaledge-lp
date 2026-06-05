import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/legal-document";
import { legalDocuments } from "@/data/legal-documents";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Vitaledge",
  description: "Vitaledgeのプライバシーポリシーです。",
};

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

      <LegalDocument
        title={legalDocuments.privacy.title}
        body={legalDocuments.privacy.body}
      />
    </div>
  );
}
