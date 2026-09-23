"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import GetIcon from "@/components/ui/Icon";
import {
  Ad,
  MessagesSquare,
  Link2,
  HandCoins,
  type LucideIcon,
  Bell,
  Gift,
} from "lucide-react";

type SidebarLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
};

type SidebarSection = {
  title: string;
  items: SidebarLink[];
};

type SidebarProps = {
  user: {
    name: string;
    phone: string;
    avatar: string;
  };
  isOpen?: boolean;
  onClose?: () => void;
};

const sections: SidebarSection[] = [
  {
    title: "دسترسی سریع",
    items: [
      { label: "لینک ها", href: "/dashboard", icon: Link2 },
      { label: "ثبت تبلیغات", href: "/dashboard/advertise", icon: Ad },
      {
        label: "ارتباط با پشتیبانی",
        href: "/dashboard/support",
        icon: MessagesSquare,
      },
      { label: "نقدینگی درآمد", href: "/dashboard/income", icon: HandCoins },
      { label: "دعوت دوستان", href: "", icon: Bell },
      { label: "اعلان ها", href: "", icon: Gift },
    ],
  },
];

export default function Sidebar({ user, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed top-0 bottom-0 z-50
        md:static lg:sticky lg:top-5 lg:h-max
        overflow-y-auto w-65 sm:w-70 md:w-66 lg:w-70 shrink-0
        bg-card md:border-l md:border-border
        px-7 pb-5 lg:rounded-token-sm
        transition-all duration-300
        ${isOpen ? "right-0" : "-right-65 sm:-right-70"}
      `}
    >
      {/* User header */}
      <div className="flex items-center justify-between h-22 mb-5 border-b border-border">
        <div className="flex items-center gap-x-2">
          <div className="flex flex-col text-token-sm">
            <span className="font-token-semibold max-w-28 truncate select-none">
              {user.name}
            </span>
            <span className="font-token-normal text-muted-foreground">
              {user.phone}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-x-3">
          <Link
            href="dashboard/settings"
            className="flex items-center justify-center cursor-pointer"
          >
            <GetIcon
              name="Settings"
              size={18}
              className="text-muted-foreground hover:text-primary transition-colors"
            />
          </Link>
          <button
            type="button"
            className="flex items-center justify-center cursor-pointer rotate-180"
          >
            <GetIcon
              name="LogOut"
              size={18}
              className="text-muted-foreground hover:text-error transition-colors"
            />
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-y-5">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-y-2.5">
            <div className="flex flex-col gap-y-2">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href && !item.disabled;

                const inner = (
                  <>
                    <span
                      className={`block w-0.5 h-5 ml-1 rounded-full ${
                        isActive ? "bg-brand" : ""
                      }`}
                    />
                    <Icon
                      size={20}
                      className="text-muted-foreground group-hover:text-brand transition-colors"
                    />
                    <span className="text-primary group-hover:text-brand text-token-xs transition-colors">
                      {item.label}
                    </span>
                  </>
                );

                return item.disabled ? (
                  <button
                    key={item.label}
                    type="button"
                    className="flex items-center gap-x-2.5 py-1.5 group text-right opacity-60 cursor-default"
                  >
                    {inner}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-x-2.5 py-1.5 group text-right"
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
