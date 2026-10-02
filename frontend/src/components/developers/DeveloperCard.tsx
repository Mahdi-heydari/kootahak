import GetIcon from "@/components/ui/Icon";
import type { Developer } from "@/types";

const DeveloperCard = ({
  developer,
}: {
  developer: Developer;
}): React.JSX.Element => {
  return (
    <article className="flex flex-col overflow-hidden rounded-token-xl border border-border bg-card shadow-token-sm transition-colors duration-token-normal hover:border-brand/30">
      <div className="flex items-center gap-4 px-5 py-5 sm:px-6 sm:py-6">
        <img
          src={developer.avatar}
          alt=""
          width={72}
          height={72}
          className="size-16 shrink-0 rounded-token-full border border-border bg-muted object-cover sm:size-18"
        />
        <div className="min-w-0 text-right">
          <h2 className="text-token-lg font-token-bold leading-token-tight text-foreground sm:text-token-xl">
            {developer.name}
          </h2>
          <p className="mt-1 text-token-sm leading-token-normal text-muted-foreground">
            {developer.role}
          </p>
        </div>
      </div>

      <ul className="border-t border-border bg-background">
        {developer.socials.map((social) => (
          <li key={social.label} className="border-b border-border last:border-b-0">
            <a
              href={social.href}
              target={social.external ? "_blank" : undefined}
              rel={social.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 px-5 py-3.5 transition-colors duration-token-normal hover:bg-brand/5 sm:px-6"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-token-md bg-brand/10 text-brand">
                <GetIcon name={social.icon} size={16} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span className="shrink-0 text-token-xs font-token-medium text-muted-foreground">
                  {social.label}
                </span>
                <span
                  dir="ltr"
                  className="break-all text-left text-token-sm font-token-medium leading-token-normal text-foreground sm:text-token-base"
                >
                  {social.value}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default DeveloperCard;
