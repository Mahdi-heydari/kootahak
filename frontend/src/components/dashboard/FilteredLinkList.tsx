"use client";

import { useSearchParams } from "next/navigation";

import { mockLinks } from "@/contents/dashboard";
import { filterAndSortLinks } from "@/lib/dashboard/filter-links";
import type { Link } from "@/types/links";
import type { UpdateLinkFormValues } from "@/lib/validations/link";

import LinkList from "./LinkList";

interface FilteredLinkListProps {
  links?: Link[];
  title?: string;
  description?: string;
  /** از والد می‌آید و به LinkList پاس داده می‌شود */
  onUpdateLink?: (id: number, data: UpdateLinkFormValues) => void;
}

export default function FilteredLinkList({
  links = mockLinks,
  title,
  description,
  onUpdateLink,
}: FilteredLinkListProps) {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const status = (searchParams.get("status") ?? "") as
    | ""
    | "active"
    | "inactive";
  const sort = (searchParams.get("sort") ?? "") as
    | ""
    | "newest"
    | "oldest"
    | "popular";

  const filteredLinks = filterAndSortLinks(links, { search, status, sort });

  // از لیست کامل (نه فیلترشده) برای بررسی یکتا بودن shortCode در مودال ویرایش
  const allShortCodes = links.map((link) => link.shortCode);

  return (
    <LinkList
      links={filteredLinks}
      title={title}
      description={description}
      totalCount={links.length}
      isFiltered={Boolean(search || status || sort)}
      onUpdateLink={onUpdateLink}
      existingShortCodes={allShortCodes}
    />
  );
}
