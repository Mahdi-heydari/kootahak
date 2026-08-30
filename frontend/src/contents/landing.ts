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
