/**
 * CaseStudy 型定義
 *
 * 実コンテンツは content/cases/*.md で管理。
 * src/lib/cases.ts がファイルを読み込んでこの型に変換する。
 */

export type CaseStudy = {
  // ── 必須 ──────────────────────────────────────
  slug: string;
  title: string;
  client: string;
  industry: string;
  employeeCount: string;
  publishedAt: string;   // ISO 8601 "YYYY-MM-DD"
  thumbnail: string;     // /images/cases/xxx.jpg
  body: string;          // 本文（自由形式 markdown）

  // ── 任意 ──────────────────────────────────────
  summary?: string;      // 省略時は body 冒頭から自動生成
  quote?: {
    text: string;
    author: string;
    role: string;
  };
};
