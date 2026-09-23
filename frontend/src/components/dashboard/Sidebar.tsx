"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import GetIcon from "@/components/ui/Icon";
import {
  Rocket,
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

const user = {
  name: "زانیار رحمانی",
  phone: "09100005547",
  avatar: "",
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed top-0 bottom-0 right-0 z-50
        w-65 sm:w-70 md:w-66 lg:w-70 shrink-0
        overflow-y-auto
        bg-card md:border-l md:border-border
        px-7 pb-5 lg:rounded-token-sm
        transition-transform duration-300
        md:static md:translate-x-0
        lg:sticky lg:top-5 lg:h-max
        ${isOpen ? "translate-x-0" : "translate-x-full"}
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
            href="/dashboard/settings"
            onClick={onClose}
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

      <div className="border-t border-border pt-5 mt-25">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-token-md bg-brand/10 text-brand">
            <Rocket size={16} />
          </div>
          <span className="text-token-sm font-token-semibold text-foreground">
            در حال توسعه
          </span>
        </div>

        <p className="text-token-xs leading-relaxed text-muted-foreground">
          تیم توسعه دهنده کوتاهک مداوم در تلاش برای ارتقای بخش‌ها و ارائه‌ی
          قابلیت‌های جدید است. بابت تکمیل‌نشدن بعضی بخش‌ها پوزش می‌طلبیم —
          به‌زودی ساخته می‌شوند.
        </p>
      </div>
    </aside>
  );
}
