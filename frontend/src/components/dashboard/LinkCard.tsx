"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import GetIcon from "@/components/ui/Icon";

import type { Link as LinkItem } from "@/types/links";
import Link from "next/link";
import Button from "../ui/Button";

interface LinkCardProps {
  link: LinkItem;
}

export default function LinkCard({ link }: LinkCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [modal, setModal] = useState<{
    type: "delete" | "toggle";
    linkId: number;
  } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shortUrl = `kootahak.ir/${link.shortCode}`;
  const fullShortUrl = `https://${shortUrl}`;

  const formattedDate = new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
  }).format(new Date(link.createdAt));

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullShortUrl);
      setCopied(true);

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [fullShortUrl]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const isInactive = !link.isActive;

  return (
    <>
      <article
        className={`rounded-token-xl p-4 transition-all duration-token-normal sm:p-5 ${
          isInactive
            ? "border border-border/30 bg-muted/70 opacity-50 grayscale shadow-none"
            : "surface shadow-token-sm hover:border-brand/30 hover:shadow-token-md"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-token-lg ${
                isInactive
                  ? "bg-muted text-muted-foreground"
                  : "bg-brand/10 text-brand"
              }`}
            >
              <GetIcon name="ExternalLink" className="size-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  className={`truncate text-token-sm font-token-semibold ${
                    isInactive ? "text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {link.title}
                </h3>

                {link.isPin && (
                  <GetIcon
                    name="Pin"
                    className={`size-3.5 shrink-0 fill-current ${
                      isInactive ? "text-muted-foreground" : "text-brand"
                    }`}
                  />
                )}
              </div>

              <p className="mt-1 truncate text-token-xs text-muted-foreground/80">
                {link.originalUrl}
              </p>
            </div>
          </div>

          <div className="relative shrink-0" ref={menuRef}>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-token-md text-muted-foreground transition-colors duration-token-normal hover:bg-muted/80 hover:text-muted-foreground"
              aria-label="عملیات"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <GetIcon name="MoreHorizontal" className="size-5" />
            </button>

            {menuOpen && (
              <div className="absolute left-0 top-full z-50 mt-1 w-44 rounded-token-lg border border-border bg-card p-1 shadow-token-md">
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-token-md px-3 py-2.5 text-token-sm transition-colors duration-token-normal hover:bg-muted"
                  onClick={() => setMenuOpen(false)}
                >
                  <GetIcon name="Pencil" className="size-4" />
                  ویرایش
                </button>

                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-token-md px-3 py-2.5 text-token-sm transition-colors duration-token-normal hover:bg-muted"
                  onClick={() => {
                    setMenuOpen(false);
                    setModal({ type: "toggle", linkId: link.id });
                  }}
                >
                  <GetIcon name="ToggleLeft" className="size-4" />
                  {link.isActive ? "غیرفعال کردن" : "فعال کردن"}
                </button>

                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-token-md px-3 py-2.5 text-token-sm text-error transition-colors duration-token-normal hover:bg-error/5"
                  onClick={() => {
                    setMenuOpen(false);
                    setModal({ type: "delete", linkId: link.id });
                  }}
                >
                  <GetIcon name="Trash2" className="size-4" />
                  حذف
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Short URL — click to copy */}
        <div className="mt-4 flex items-center gap-2 sm:mt-5">
          <button
            type="button"
            onClick={handleCopy}
            title="کلیک برای کپی"
            className={`min-h-11 min-w-0 flex-1 truncate rounded-token-md px-3 py-2.5 text-start text-token-sm font-token-medium transition-colors duration-token-normal ${
              copied
                ? "bg-success/10 text-success"
                : isInactive
                  ? "bg-muted/80 text-muted-foreground"
                  : "bg-muted hover:bg-brand/5 hover:text-brand"
            }`}
          >
            {copied ? "کپی شد!" : shortUrl}
          </button>

          <button
            type="button"
            className={`flex size-11 shrink-0 items-center justify-center rounded-token-md border transition-colors duration-token-normal ${
              copied
                ? "border-success/30 bg-success/10 text-success"
                : isInactive
                  ? "border-border/40 bg-muted/80 text-muted-foreground"
                  : "border-border hover:border-brand/30 hover:bg-brand/5"
            }`}
            aria-label="کپی لینک"
            onClick={handleCopy}
          >
            {copied ? (
              <GetIcon name="Check" className="size-4" />
            ) : (
              <GetIcon name="Copy" className="size-4" />
            )}
          </button>
        </div>

        {/* Footer */}
        <div
          className={`mt-4 flex flex-col gap-3 border-t pt-4 sm:mt-5 sm:flex-row sm:items-center sm:justify-between ${
            isInactive ? "border-border/30" : "border-border"
          }`}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-token-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <GetIcon name="Eye" className="size-3.5" />
              {link.visits.length} بازدید
            </span>

            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <div className="flex items-center gap-1.5 text-token-xs">
              <span
                className={`size-2 rounded-token-full ${
                  link.isActive ? "bg-success" : "bg-muted-foreground"
                }`}
              />

              <span
                className={
                  link.isActive ? "text-success" : "text-muted-foreground"
                }
              >
                {link.isActive ? "فعال" : "غیرفعال"}
              </span>
            </div>

            <Link href={`/dashboard/analytics/${link.id}`}>
              <Button
                variant={isInactive ? "secondary" : "outline"}
                size="sm"
                className="min-h-11 gap-1.5 px-3"
              >
                <GetIcon name="BarChart3" className="size-4" />
                <span>آمار</span>
              </Button>
            </Link>
          </div>
        </div>
      </article>

      {/* Confirmation Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="surface w-full max-w-sm rounded-token-xl p-6 shadow-token-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="h3">
              {modal.type === "delete" ? "حذف لینک" : "تغییر وضعیت لینک"}
            </h3>
            <p className="mt-2 body-muted">
              {modal.type === "delete"
                ? "آیا از حذف این لینک اطمینان دارید؟ این عمل قابل بازگشت نیست."
                : `آیا می‌خواهید این لینک را ${link.isActive ? "غیرفعال" : "فعال"} کنید؟`}
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setModal(null)}
              >
                انصراف
              </Button>
              <Button
                variant={modal.type === "delete" ? "danger" : "primary"}
                size="sm"
                onClick={() => {
                  console.log(`${modal.type} link ${modal.linkId}`);
                  setModal(null);
                }}
              >
                {modal.type === "delete" ? "حذف" : "تأیید"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
