import { DevelopersContent } from "@/types";

// آدرس ایمیل‌ها نمونه است؛ با ایمیل واقعی عوض شود.
export const developersContent: DevelopersContent = {
  heading: {
    before: "توسعه دهندگان",
    highlight: "کوتاهک‌",
    after: "",
    description: "از یک پروژه تفریحی تا یک ابزار کاربردی",
  },
  developers: [
    {
      id: "erfan",
      name: "عرفان طلوع",
      role: "فرانت‌اند دولوپر",
      avatar: "/developers/erfan.jpg",
      socials: [
        {
          label: "گیت‌هاب",
          value: "erfantolou00",
          href: "https://github.com/erfantolou00",
          icon: "Github",
          external: true,
        },
        {
          label: "ایمیل",
          value: "erfantolou@gmail.com",
          href: "mailto:erfantolou@gmail.com",
          icon: "Mail",
        },
        {
          label: "لینکدین",
          value: "erfan-tolou",
          href: "https://www.linkedin.com/in/erfanTolouAsl",
          icon: "Linkedin",
          external: true,
        },
      ],
    },
    {
      id: "mahdi",
      name: "مهدی حیدری",
      role: "بک‌اند دولوپر و لید",
      avatar: "/developers/mahdi.jpg",
      socials: [
        {
          label: "گیت‌هاب",
          value: "Mahdi-heydari",
          href: "https://github.com/Mahdi-heydari",
          icon: "Github",
          external: true,
        },
        {
          label: "ایمیل",
          value: "mahdi.funlife@gmail.com",
          href: "mailto:mahdi.funlife@gmail.com",
          icon: "Mail",
        },
        {
          label: "لینکدین",
          value: "mahdi-heydarii",
          href: "https://www.linkedin.com/in/mahdi-heydarii",
          icon: "Linkedin",
          external: true,
        },
      ],
    },
  ],
};
