"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, ExternalLink, Eye, MoreHorizontal, Pin, Pencil, Trash2, ToggleLeft } from "lucide-react";

import type { Link } from "@/types/links";
import Link from "next/link";

interface LinkCardProps {
  link: Link;
}

export default function LinkCard({ link }: LinkCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<{ type: "delete" | "toggle"; linkId: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const shortUrl = `kootahak.ir/${link.shortCode}`;

  const formattedDate = new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
  }).format(new Date(link.createdAt));

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Link href={`/dashboard/analytics/${link.id}`} className="block">
        <article
          className={`group rounded-2xl border bg-background p-5 transition-all ${
            !link.isActive
              ? "opacity-60 grayscale hover:opacity-70"
              : "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <ExternalLink className="size-5 text-primary" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-semibold">{link.title}</h3>

                  {link.isPin && (
                    <Pin className="size-3.5 shrink-0 fill-current text-primary" />
                  )}
                </div>

                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {link.originalUrl}
                </p>
              </div>
            </div>

            <div className="relative" ref={menuRef}>
              <button
                type="button"
                className="shrink-0 rounded-lg p-2 opacity-60 transition hover:bg-muted hover:opacity-100"
                aria-label="عملیات"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMenuOpen((prev) => !prev);
                }}
              >
                <MoreHorizontal className="size-5" />
              </button>

              {menuOpen && (
                <div className="absolute left-0 top-full z-50 mt-1 w-44 rounded-xl border bg-background p-1 shadow-lg">
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-muted"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setMenuOpen(false);
                    }}
                  >
                    <Pencil className="size-4" />
                    ویرایش
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-muted"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setMenuOpen(false);
                      setModal({ type: "toggle", linkId: link.id });
                    }}
                  >
                    <ToggleLeft className="size-4" />
                    {link.isActive ? "غیرفعال کردن" : "فعال کردن"}
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/50"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setMenuOpen(false);
                      setModal({ type: "delete", linkId: link.id });
                    }}
                  >
                    <Trash2 className="size-4" />
                    حذف
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Short URL */}
          <div className="mt-5 flex items-center gap-2">
            <div className="min-w-0 flex-1 truncate rounded-lg bg-muted px-3 py-2 text-sm font-medium">
              {shortUrl}
            </div>

            <button
              type="button"
              className="rounded-lg border p-2 transition hover:bg-muted"
              aria-label="کپی لینک"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Copy className="size-4" />
            </button>
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Eye className="size-3.5" />
                {link.visits.length} بازدید
              </span>

              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span
                className={`size-2 rounded-full ${
                  link.isActive ? "bg-emerald-500" : "bg-zinc-400"
                }`}
              />

              <span
                className={
                  link.isActive
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground"
                }
              >
                {link.isActive ? "فعال" : "غیرفعال"}
              </span>
            </div>
          </div>
        </article>
      </Link>

      {/* Confirmation Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setModal(null)}
        >
          <div
            className="mx-4 w-full max-w-sm rounded-2xl border bg-background p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold">
              {modal.type === "delete" ? "حذف لینک" : "تغییر وضعیت لینک"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {modal.type === "delete"
                ? "آیا از حذف این لینک اطمینان دارید؟ این عمل قابل بازگشت نیست."
                : `آیا می‌خواهید این لینک را ${link.isActive ? "غیرفعال" : "فعال"} کنید؟`}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="rounded-lg border px-4 py-2 text-sm transition hover:bg-muted"
                onClick={() => setModal(null)}
              >
                انصراف
              </button>
              <button
                type="button"
                className={`rounded-lg px-4 py-2 text-sm text-white transition ${
                  modal.type === "delete"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-primary hover:opacity-90"
                }`}
                onClick={() => {
                  console.log(`${modal.type} link ${modal.linkId}`);
                  setModal(null);
                }}
              >
                {modal.type === "delete" ? "حذف" : "تأیید"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
