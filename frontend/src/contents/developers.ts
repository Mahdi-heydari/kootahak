import { DevelopersContent } from "@/types";

// مقدار href و value شبکه‌ها و شماره را با اطلاعات واقعی عوض کنید.
export const developersContent: DevelopersContent = {
  heading: {
    before: "کوتاهک را",
    highlight: "دو نفر",
    after: "می‌سازند",
    description:
      "یکی حواسش به هر فریم رابط است، یکی به هر درخواستی که از سرور رد می‌شود. سرعت از فرانت شروع می‌شود و در بک‌اند تمام.",
  },
  developers: [
    {
      id: "erfan",
      name: "عرفان طلوع",
      role: "فرانت‌اند دولوپر",
      avatar: "/developers/erfan.svg",
      socials: [
        {
          label: "لینکدین",
          value: "erfan-tolou",
          href: "https://www.linkedin.com/in/erfan-tolou",
          icon: "Linkedin",
          external: true,
        },
        {
          label: "گیت‌هاب",
          value: "erfan-tolou",
          href: "https://github.com/erfan-tolou",
          icon: "Github",
          external: true,
        },
        {
          label: "تلگرام",
          value: "@erfan_tolou",
          href: "https://t.me/erfan_tolou",
          icon: "Send",
          external: true,
        },
        {
          label: "شماره",
          value: "۰۹۰۰ ۰۰۰ ۰۰۰۱",
          href: "tel:+989000000001",
          icon: "Phone",
        },
      ],
    },
    {
      id: "mahdi",
      name: "مهدی حیدری",
      role: "بک‌اند دولوپر و لید",
      avatar: "/developers/mahdi.svg",
      socials: [
        {
          label: "لینکدین",
          value: "mahdi-heydari",
          href: "https://www.linkedin.com/in/mahdi-heydari",
          icon: "Linkedin",
          external: true,
        },
        {
          label: "گیت‌هاب",
          value: "Mahdi-heydari",
          href: "https://github.com/Mahdi-heydari",
          icon: "Github",
          external: true,
        },
        {
          label: "تلگرام",
          value: "@mahdi_heydari",
          href: "https://t.me/mahdi_heydari",
          icon: "Send",
          external: true,
        },
        {
          label: "شماره",
          value: "۰۹۰۰ ۰۰۰ ۰۰۰۲",
          href: "tel:+989000000002",
          icon: "Phone",
        },
      ],
    },
  ],
};
