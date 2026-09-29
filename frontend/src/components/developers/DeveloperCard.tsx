import GetIcon from "@/components/ui/Icon";
import type { Developer } from "@/types";

const DeveloperCard = ({
  developer,
}: {
  developer: Developer;
}): React.JSX.Element => {
  return (
    <article className="flex flex-col bg-card border border-border rounded-token-xl shadow-token-sm overflow-hidden hover:border-brand/30 transition-colors duration-token-normal">
      <div className="flex flex-col items-center text-center px-6 pt-8 pb-6">
        <img
          src={developer.avatar}
          alt=""
          width={80}
          height={80}
          className="size-20 rounded-full border border-border object-cover bg-muted"
        />
        <h2 className="mt-4 text-token-xl font-token-bold text-foreground leading-token-tight">
          {developer.name}
        </h2>
        <p className="mt-1 text-token-sm text-muted-foreground">
          {developer.role}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4 border-t border-border bg-background">
        {developer.socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target={social.external ? "_blank" : undefined}
            rel={social.external ? "noopener noreferrer" : undefined}
            className="flex items-center gap-x-3 min-w-0 rounded-token-md border border-border bg-card px-3 py-2.5 hover:border-brand/30 hover:bg-brand/5 transition-colors duration-token-normal"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-token-sm bg-brand/10 text-brand">
              <GetIcon name={social.icon} size={15} />
            </span>
            <span className="min-w-0">
              <span className="block text-token-xs text-muted-foreground">
                {social.label}
              </span>
              <span
                dir="ltr"
                className="block truncate text-left text-token-sm font-token-medium text-foreground"
              >
                {social.value}
              </span>
            </span>
          </a>
        ))}
      </div>
    </article>
  );
};

export default DeveloperCard;
