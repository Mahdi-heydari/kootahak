import LinkToolbar from "@/components/dashboard/LinkToolbar";
import LinkList from "@/components/dashboard/LinkList";

import { mockLinks } from "@/contents/dashboard";

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-6">
      <LinkToolbar />

      <LinkList links={mockLinks} />
    </div>
  );
}
