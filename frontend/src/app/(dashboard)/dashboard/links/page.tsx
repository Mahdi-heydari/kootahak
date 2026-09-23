import { Suspense } from "react";
import DashboardLinksSection from "@/components/dashboard/DashboardLinksSection";

function LinksFallback() {
  return (
    <div className="space-y-6">
      <div className="h-24 rounded-token-md bg-muted animate-pulse" />
      <div className="h-48 rounded-token-md bg-muted animate-pulse" />
    </div>
  );
}

export default function LinkPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <Suspense fallback={<LinksFallback />}>
          <DashboardLinksSection />
      </Suspense>
    </div>
  );
}
