import type { TermsSection } from "@/types";

interface TermsSectionCardProps {
  section: TermsSection;
  index: number;
}

const TermsSectionCard = ({
  section,
  index,
}: TermsSectionCardProps): React.JSX.Element => {
  const { id, title, paragraphs, items } = section;
  const headingId = `terms-${id}`;

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-token-lg border border-border bg-card p-5 shadow-token-md sm:p-6"
    >
      <h2
        id={headingId}
        className="mb-3 flex items-center gap-x-3 text-token-lg font-token-semibold text-foreground sm:text-token-xl"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-token-sm bg-brand/10 text-token-sm font-token-bold text-brand">
          {(index + 1).toLocaleString("fa-IR")}
        </span>
        {title}
      </h2>

      <div className="space-y-3 text-token-sm leading-token-relaxed text-muted-foreground sm:text-token-base">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {items && (
        <ul className="mt-4 space-y-2.5">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-baseline gap-x-2.5 text-token-sm leading-token-relaxed text-foreground sm:text-token-base"
            >
              <span aria-hidden className="block size-2 shrink-0 bg-brand" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default TermsSectionCard;
