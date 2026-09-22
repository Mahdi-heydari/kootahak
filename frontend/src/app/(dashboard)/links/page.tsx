import { Suspense } from "react";
import DashboardLinksSection from "@/components/dashboard/DashboardLinksSection";

function LinksPageFallback() {
  return (
    <div className="space-y-6">
      <div className="h-16 rounded-token-md bg-muted animate-pulse" />
      <div className="h-24 rounded-token-md bg-muted animate-pulse" />
      <div className="h-48 rounded-token-md bg-muted animate-pulse" />
    </div>
  );
}

export default function LinksPage() {
  return (
    <div className="space-y-6 p-4 sm:space-y-8 sm:p-6">
      <div>
        <h1 className="h2">لینک‌های من</h1>

        <p className="mt-1 text-token-sm text-muted-foreground">
          مدیریت و مشاهده تمام لینک‌های کوتاه‌شده
        </p>
      </div>

      <Suspense fallback={<LinksPageFallback />}>
        <div className="space-y-6 sm:space-y-8">
          <DashboardLinksSection
            listTitle="همه لینک‌ها"
            listDescription="لیست کامل لینک‌های کوتاه‌شده شما"
          />
        </div>
      </Suspense>
    </div>
  );
}
