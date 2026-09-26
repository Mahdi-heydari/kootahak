"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { useLinks } from "@/hooks/links/use-links";
import { useCreateLink } from "@/hooks/links/use-link-mutations";
import { parseLinksQuery, toLinksListParams } from "@/lib/links/query-params";
import type { CreateLinkFormValues } from "@/lib/validations/link";
import LinksToolbar from "./LinksToolbar";
import LinksList from "./LinksList";
import LinkPagination from "./LinkPagination";
import CreateLinkModal from "./CreateLinkModal";

function defaultTitleFromUrl(url: string): string {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "");
  } catch {
    return "لینک جدید";
  }
}

export default function LinksPage() {
  const searchParams = useSearchParams();
  const [createOpen, setCreateOpen] = useState(false);

  const { parsed, params } = useMemo(() => {
    const parsed = parseLinksQuery(
      new URLSearchParams(searchParams.toString()),
    );
    return { parsed, params: toLinksListParams(parsed) };
  }, [searchParams]);

  const { data, isLoading, isError, refetch, isFetching } = useLinks(params);
  const createMutation = useCreateLink();

  const isFiltered =
    Boolean(parsed.search) ||
    parsed.isActive !== undefined ||
    parsed.isPin !== undefined ||
    parsed.expired !== undefined;

  function handleCreate(data: CreateLinkFormValues) {
    // title اگه خالی بود از URL مشتق کن — چون بکند title رو اجباری می‌گیره
    const title = data.title?.trim() || defaultTitleFromUrl(data.originalUrl);

    // UI اسمش shortCode ئه، بکند تو create اسمش suggestedCode ئه — تو لایه API map می‌کنیم
    const suggestedCode = data.shortCode?.trim().toLowerCase() || undefined;

    createMutation.mutate(
      { originalUrl: data.originalUrl, title, suggestedCode },
      {
        onSuccess: () => {
          toast.success("لینک ساخته شد");
          setCreateOpen(false);
        },
        onError: (err: unknown) => {
          const status = (err as { response?: { status?: number } })?.response
            ?.status;
          if (status === 409) {
            toast.error("این نام کوتاه قبلاً استفاده شده");
          } else if (status === 400) {
            toast.error("اطلاعات وارد شده معتبر نیست");
          } else {
            toast.error("ساخت لینک انجام نشد");
          }
        },
      },
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <LinksToolbar
        isFetching={isFetching}
        onCreateClick={() => setCreateOpen(true)}
      />

      {isError ? (
        <div className="surface rounded-token-xl px-6 py-12 text-center shadow-token-sm">
          <p className="text-token-sm font-token-medium text-foreground">
            خطا در دریافت لینک‌ها
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 text-token-sm font-token-medium text-brand hover:text-brand/80"
          >
            تلاش مجدد
          </button>
        </div>
      ) : (
        <LinksList
          links={data?.links ?? []}
          totalCount={data?.totalCount ?? 0}
          isFiltered={isFiltered}
          isLoading={isLoading}
        />
      )}

      {data && data.totalPages > 1 && (
        <LinkPagination
          page={parsed.page}
          totalPages={data.totalPages}
          limit={parsed.limit}
        />
      )}

      <CreateLinkModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
        isSubmitting={createMutation.isPending}
      />
    </div>
  );
}
