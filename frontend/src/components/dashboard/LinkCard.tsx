"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, ExternalLink, Eye, MoreHorizontal, Pin, Pencil, Trash2, ToggleLeft } from "lucide-react";

import type { Link as LinkItem } from "@/types/links";
import Link from "next/link";
import Button from "../ui/Button";

interface LinkCardProps {
  link: LinkItem;
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
          className={`group surface rounded-token-xl p-5 shadow-token-sm transition-all duration-token-normal ${
            !link.isActive
              ? "opacity-60 grayscale hover:opacity-70"
              : "hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-token-md"
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-token-lg bg-brand/10">
                <ExternalLink className="size-5 text-brand" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-token-sm font-token-semibold">{link.title}</h3>

                  {link.isPin && (
                    <Pin className="size-3.5 shrink-0 fill-current text-brand" />
                  )}
                </div>

                <p className="mt-1 truncate text-token-xs text-muted-foreground">
                  {link.originalUrl}
                </p>
              </div>
            </div>

            <div className="relative" ref={menuRef}>
              <button
                type="button"
                className="shrink-0 rounded-token-md p-2 opacity-60 transition-colors duration-token-normal hover:bg-muted hover:opacity-100"
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
                <div className="absolute left-0 top-full z-50 mt-1 w-44 rounded-token-lg border border-border bg-card p-1 shadow-token-md">
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-token-md px-3 py-2 text-token-sm transition-colors duration-token-normal hover:bg-muted"
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
                    className="flex w-full items-center gap-2 rounded-token-md px-3 py-2 text-token-sm transition-colors duration-token-normal hover:bg-muted"
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
                    className="flex w-full items-center gap-2 rounded-token-md px-3 py-2 text-token-sm text-error transition-colors duration-token-normal hover:bg-error/5"
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
            <div className="min-w-0 flex-1 truncate rounded-token-md bg-muted px-3 py-2 text-token-sm font-token-medium">
              {shortUrl}
            </div>

            <button
              type="button"
              className="rounded-token-md border border-border p-2 transition-colors duration-token-normal hover:border-brand/30 hover:bg-brand/5"
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
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-3 text-token-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Eye className="size-3.5" />
                {link.visits.length} بازدید
              </span>

              <span>{formattedDate}</span>
            </div>

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
            className="surface mx-4 w-full max-w-sm rounded-token-xl p-6 shadow-token-md"
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
            <div className="mt-6 flex justify-end gap-3">
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
