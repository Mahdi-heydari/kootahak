"use client";

import { useSearchParams } from "next/navigation";

import { mockLinks } from "@/contents/dashboard";
import { filterAndSortLinks } from "@/lib/dashboard/filter-links";
import type { Link } from "@/types/links";

import LinkList from "./LinkList";

interface FilteredLinkListProps {
  links?: Link[];
  title?: string;
  description?: string;
}

export default function FilteredLinkList({
  links = mockLinks,
  title,
  description,
}: FilteredLinkListProps) {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const status = (searchParams.get("status") ?? "") as
    "" | "active" | "inactive";
  const sort = (searchParams.get("sort") ?? "") as
    "" | "newest" | "oldest" | "popular";

  const filteredLinks = filterAndSortLinks(links, { search, status, sort });

  return (
    <LinkList
      links={filteredLinks}
      title={title}
      description={description}
      totalCount={links.length}
      isFiltered={Boolean(search || status || sort)}
    />
  );
}
