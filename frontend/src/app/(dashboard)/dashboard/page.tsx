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
    <div className="space-y-6 p-4 sm:space-y-8 sm:p-6">
      <Suspense fallback={<DashboardLinksFallback />}>
        <div className="space-y-6 sm:space-y-8">
          <DashboardLinksSection />
        </div>
      </Suspense>
    </div>
  );
}
