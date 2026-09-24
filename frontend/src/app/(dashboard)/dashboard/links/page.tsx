import { Suspense } from "react";
import LinksPage from "@/components/dashboard/links/LinksPage";
import LinksSkeleton from "@/components/dashboard/links/LinksSkeleton";

export default function Page() {
  return (
    <Suspense fallback={<LinksSkeleton />}>
      <LinksPage />
    </Suspense>
  );
}
