import { Suspense } from "react";
import DashboardLinksSection from "@/components/dashboard/DashboardLinksSection";

function DashboardLinksFallback() {
  return (
    <div className="space-y-6">
      <div className="h-24 rounded-token-md bg-muted animate-pulse" />
      <div className="h-48 rounded-token-md bg-muted animate-pulse" />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <Suspense fallback={<DashboardLinksFallback />}>
        <div className="space-y-14 sm:space-y-10">
          <DashboardLinksSection />
        </div>
      </Suspense>
    </div>
  );
}
