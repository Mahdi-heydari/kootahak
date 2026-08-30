import { NavLink, UserInfo } from "@/types";

export const navLinks: NavLink[] = [
  { label: "خانه", href: "/" },
  { label: "درباره ما", href: "#about" },
  { label: "پرسش های پرتکرار", href: "#" },
  { label: "خدمات", href: "#services" },
  { label: "فوتر", href: "#footer" },
];

export const mockUser: UserInfo = {
  name: "زانیار رحمانی",
  phone: "09145562747",
};

export const usefulLinks = [
  { href: "/1", label: "لینک-1" },
  {
    href: "/2",
    label: "لینک-2",
    external: true,
  },
  { href: "/3", label: "لینک-3" },
  { href: "/4", label: "لینک-4" },
];

export const statistics = [
  { value: "125,340", label: "تعداد لینک‌های کوتاه شده" },
  { value: "543", label: "کاربران فعال" },
  { value: "1,230", label: "لینک‌های ایجاد شده امروز" },
];
