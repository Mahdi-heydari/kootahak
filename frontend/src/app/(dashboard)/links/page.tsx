import { Suspense } from "react";
import LinkList from "@/components/dashboard/LinkList";
import LinkToolbar from "@/components/dashboard/LinkToolbar";
import { mockLinks } from "@/contents/dashboard";

function ToolbarFallback() {
  return <div className="h-12 rounded-token-md bg-muted animate-pulse" />;
}

export default function LinksPage() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="h2">لینک‌های من</h1>

        <p className="mt-1 text-token-sm text-muted-foreground">
          مدیریت و مشاهده تمام لینک‌های کوتاه‌شده
        </p>
      </div>

      <Suspense fallback={<ToolbarFallback />}>
        <LinkToolbar />
      </Suspense>

      <LinkList links={mockLinks} />
    </div>
  );
}
