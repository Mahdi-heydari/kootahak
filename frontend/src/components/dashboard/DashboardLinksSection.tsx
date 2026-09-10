"use client";

import { useState } from "react";

import { mockLinks } from "@/contents/dashboard";
import { buildNewLink } from "@/lib/dashboard/create-link";
import type { CreateLinkFormValues } from "@/lib/validations/link";
import type { Link } from "@/types/links";

import CreateLinkModal from "./CreateLinkModal";
import FilteredLinkList from "./FilteredLinkList";
import LinkToolbar from "./LinkToolbar";

interface DashboardLinksSectionProps {
  listTitle?: string;
  listDescription?: string;
}

export default function DashboardLinksSection({
  listTitle,
  listDescription,
}: DashboardLinksSectionProps) {
  const [links, setLinks] = useState<Link[]>(mockLinks);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleCreateLink = (data: CreateLinkFormValues) => {
    try {
      const newLink = buildNewLink(data, links);
      setLinks((current) => [newLink, ...current]);
    } catch {
      // duplicate short code handled in modal validation
    }
  };

  return (
    <>
      <LinkToolbar onCreateClick={() => setCreateModalOpen(true)} />
      <FilteredLinkList
        links={links}
        title={listTitle}
        description={listDescription}
      />
      <CreateLinkModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateLink}
        existingShortCodes={links.map((link) => link.shortCode)}
      />
    </>
  );
}
