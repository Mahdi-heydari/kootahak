import LinkList from "@/components/dashboard/LinkList";
import LinkToolbar from "@/components/dashboard/LinkToolbar";
import { mockLinks } from "@/contents/dashboard";

export default function LinksPage() {
  return (
    <main className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold">لینک‌های من</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          مدیریت و مشاهده تمام لینک‌های کوتاه‌شده
        </p>
      </div>

      <LinkToolbar />

      <LinkList links={mockLinks} />
    </main>
  );
}