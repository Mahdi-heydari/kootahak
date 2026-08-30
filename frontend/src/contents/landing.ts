import { NavLink, UserInfo } from "@/types";

// Header (Nav)
export const navLinks: NavLink[] = [
  { label: "خانه", href: "/" },
  { label: "درباره ما", href: "#about" },
  { label: "پرسش های پرتکرار", href: "#" },
  { label: "خدمات", href: "#services" },
  { label: "فوتر", href: "#footer" },
];

// Profile
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
// Hero Content
export const heroContent = {
  titleHighlight: "لینک‌های طولانی",
  title: "رو کوتاه کن",
  subtitle: "و لینک‌هات رو مدیریت کن!",
  description:
    "با کوتاهک، لینک‌های طولانی رو در چند ثانیه کوتاه کن. آمار دقیق بازدید، امنیت بالا و مدیریت آسان لینک‌ها، همه در یک پلتفرم ساده و حرفه‌ای.",
  placeholder: "... لینک خود را وارد کنید",
  features: [
    { title: "کوتاه‌سازی", description: "لینک‌های طولانی" },
    { title: "آمار دقیق", description: "لحظه‌ای و کامل" },
    { title: "فلان فلان", description: "مطمئن و پایدار" },
  ],
  trustItems: ["محبوب در بین کاربران", "پاسخگویی آنی"],
};
