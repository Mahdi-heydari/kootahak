import GetIcon from "@/components/ui/Icon";
import type { DeveloperSocial } from "@/types";

const DeveloperSocials = ({
  socials,
}: {
  socials: DeveloperSocial[];
}): React.JSX.Element => {
  return (
    <ul className="flex flex-col gap-y-2.5">
      {socials.map((social) => (
        <li
          key={social.label}
          className="flex items-center justify-between gap-x-3 gap-y-1"
        >
          <span className="inline-flex items-center gap-x-1.5 font-token-normal text-token-sm text-muted-foreground">
            <GetIcon name={social.icon} size={14} />
            {social.label}
          </span>
          <a
            href={social.href}
            dir="ltr"
            target={social.external ? "_blank" : undefined}
            rel={social.external ? "noopener noreferrer" : undefined}
            className="font-token-normal text-token-sm text-foreground hover:text-brand transition-colors"
          >
            {social.value}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default DeveloperSocials;
