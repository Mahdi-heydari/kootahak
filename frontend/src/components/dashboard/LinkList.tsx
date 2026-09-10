import type { Link } from "@/types/links";
import LinkCard from "./LinkCard";

interface LinkListProps {
  links: Link[];
}

export default function LinkList({ links }: LinkListProps) {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="h3">لینک‌های اخیر</h2>

          <p className="mt-1 text-token-sm text-muted-foreground">
            آخرین لینک‌هایی که ایجاد کرده‌ای
          </p>
        </div>

        <span className="label">
          {links.length} لینک
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </section>
  );
}
