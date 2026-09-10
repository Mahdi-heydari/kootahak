import { Suspense } from "react";
import LinkToolbar from "@/components/dashboard/LinkToolbar";
import LinkList from "@/components/dashboard/LinkList";

import { mockLinks } from "@/contents/dashboard";

function ToolbarFallback() {
  return <div className="h-12 rounded-token-md bg-muted animate-pulse" />;
}

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-6">
      <Suspense fallback={<ToolbarFallback />}>
        <LinkToolbar />
      </Suspense>

      <LinkList links={mockLinks} />
    </div>
  );
}
