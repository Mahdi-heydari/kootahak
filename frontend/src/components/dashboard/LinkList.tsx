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
          <h2 className="text-lg font-semibold">لینک‌های اخیر</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            آخرین لینک‌هایی که ایجاد کرده‌ای
          </p>
        </div>

        <span className="text-sm text-muted-foreground">
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