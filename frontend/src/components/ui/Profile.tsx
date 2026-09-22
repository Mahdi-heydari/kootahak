import Button from "./Button";
import Icon from "@/components/ui/Icon";
import type { ProfileProps } from "@/types";
import { profileContent } from "@/contents/landing";

export default function Profile({ user }: ProfileProps) {
  const { menuItems, logoutLabel } = profileContent;

  return (
    <div className="md:absolute top-[150%] left-0 font-iranyekan text-token-sm md:group-hover:visible md:group-hover:opacity-100 md:invisible md:opacity-0 z-50 transition-all">
      <div className="w-full md:w-64 md:bg-card md:border border-border md:rounded-token-sm overflow-hidden">
        {/* User Info */}
        <div className="flex items-center gap-x-3 ps-4 py-4 md:p-4 border-b border-border">
          <div className="flex flex-col cursor-default min-w-0">
            <span className="text-token-sm font-token-medium text-foreground truncate">
              {user.name}
            </span>
            <span className="text-token-xs text-muted-foreground">
              {user.phone}
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-x-3 py-2.5 px-3 rounded-token-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
            >
              <Icon name={item.icon} size={18} />
              <span className="text-token-sm">{item.label}</span>
            </a>
          ))}
        </div>

        {/* Logout Button */}
        <div className="p-0 md:p-3 border-t border-border">
          <Button
            onClick={() => {
              // logout logic
              console.log("Logout clicked");
            }}
            size="md"
            variant="danger"
            className="w-full"
          >
            <span className="text-token-sm font-token-medium">
              {logoutLabel}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
