"use client";

import { useParams } from "next/navigation";
import LinkAnalyticsPage from "@/components/dashboard/analytics/LinkAnalyticsPage";

export default function AnalyticsPage() {
  const params = useParams<{ id: string }>();
  const linkId = Number(params.id);

  return <LinkAnalyticsPage linkId={linkId} />;
}
