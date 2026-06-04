"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { label: "導入事例", href: "/cases" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // ページ遷移時に閉じる
  useEffect(() => { setOpen(false); }, [pathname]);

  // メニュー開閉時に body スクロールを制御
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-warm-200/50 bg-background/80 backdrop-blur-md">

        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/image/logo.svg"
              alt="Vitaledge"
              className="h-5 w-auto brightness-0"
            />
          </Link>

          {/* PC Nav + CTA */}
          <div className="hidden md:flex items-center gap-8">
            {nav.map(({ label, href }) => {
              const isActive = href.startsWith("/cases")
                ? pathname.startsWith("/cases")
                : false;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-foreground font-semibold" : "text-foreground"
                  )}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              無料相談 →
            </Link>
          </div>

          {/* ハンバーガーボタン */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              // × アイコン
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 4l12 12M16 4L4 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              // ハンバーガーアイコン
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3 5h14M3 10h14M3 15h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* SP ドロワーメニュー */}
      {/* オーバーレイ */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/40 md:hidden transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* メニューパネル */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-72 bg-background shadow-none border-l border-border md:hidden",
          "flex flex-col transition-transform duration-250 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* ヘッダー部 */}
        <div className="h-0.5 w-full bg-brand-gradient" />
        <div className="flex items-center justify-between px-6 h-16 border-b border-border shrink-0">
          <span className="text-sm font-semibold text-foreground">メニュー</span>
          <button
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="メニューを閉じる"
            onClick={() => setOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 4l12 12M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* ナビゲーション */}
        <nav className="flex flex-col px-6 py-6 gap-1 flex-1">
          {nav.map(({ label, href }) => {
            const isActive = href.startsWith("/cases")
              ? pathname.startsWith("/cases")
              : false;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-base font-medium py-3 border-b border-border transition-colors hover:text-primary",
                  isActive ? "text-foreground font-semibold" : "text-foreground"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="px-6 pb-8 shrink-0">
          <Link
            href="/#contact"
            className="block w-full text-center bg-primary text-primary-foreground text-sm font-semibold px-4 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            無料相談 →
          </Link>
        </div>
      </div>
    </>
  );
}
