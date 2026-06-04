/**
 * CMSデータアクセス層
 *
 * content/cases/*.md を読み込んで CaseStudy[] を返す。
 * 新しい記事は content/cases/ に .md ファイルを追加するだけでOK。
 * （_ で始まるファイルはスキップ）
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type CaseStudy } from "@/data/cases";

const CONTENT_DIR = path.join(process.cwd(), "content/cases");

function parseMarkdown(filename: string): CaseStudy | null {
  if (filename.startsWith("_")) return null;

  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
  const { data, content } = matter(raw);

  // slug がなければファイル名から導出（拡張子除く）
  const slug: string = data.slug ?? filename.replace(/\.md$/, "");

  // 必須フィールドが欠けているファイルはスキップ
  if (!data.title || !data.client) return null;

  const body = content.trim();

  // summary が未指定なら body の最初の段落から自動生成
  const summary: string =
    data.summary ??
    (body
      .split(/\n\n+/)
      .find((p) => p && !p.startsWith("#"))
      ?.slice(0, 100)
      .replace(/\n/g, " ") ?? "") + "…";

  return {
    slug,
    title: data.title,
    client: data.client,
    industry: data.industry ?? "",
    employeeCount: data.employeeCount ?? "",
    publishedAt: data.publishedAt ?? "",
    thumbnail: data.thumbnail ?? "",
    body,
    summary,
    quote: data.quote,
  };
}

function loadAllCases(): CaseStudy[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map(parseMarkdown)
    .filter((c): c is CaseStudy => c !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getAllCases(): CaseStudy[] {
  return loadAllCases();
}

export function getLatestCases(n: number): CaseStudy[] {
  return getAllCases().slice(0, n);
}

export function getCaseBySlug(slug: string): CaseStudy | null {
  return getAllCases().find((c) => c.slug === slug) ?? null;
}

export function getAllCaseSlugs(): { slug: string }[] {
  return getAllCases().map((c) => ({ slug: c.slug }));
}

export function getRelatedCases(current: CaseStudy, n = 3): CaseStudy[] {
  const all = getAllCases();
  const sameIndustry = all.filter(
    (c) => c.slug !== current.slug && c.industry === current.industry
  );
  const others = all.filter(
    (c) => c.slug !== current.slug && c.industry !== current.industry
  );
  return [...sameIndustry, ...others].slice(0, n);
}

export function getAllIndustries(): string[] {
  return [...new Set(getAllCases().map((c) => c.industry))].sort();
}
