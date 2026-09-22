import {
  NavLink,
  UserInfo,
  FooterContent,
  HeroContent,
  ProblemsContent,
  SolutionContent,
  ProfileContent,
} from "@/types";

// Header (Nav)
export const navLinks: NavLink[] = [
  { label: "خانه", href: "#hero" },
  { label: "مشکلات", href: "#problems" },
  { label: "راهکارها", href: "#solution" },
  { label: "پرسش‌های پرتکرار", href: "#faq" },
];

// Profile
export const mockUser: UserInfo = {
  name: "زانیار رحمانی",
  phone: "09145562747",
};
export const profileContent: ProfileContent = {
  menuItems: [
    { href: "/dash", label: "داشبورد", icon: "Settings" },
    { href: "/supp", label: "پشتیبانی", icon: "MessageCircleMore" },
  ],
  logoutLabel: "خروج از حساب کاربری",
};

export const statistics = [
  { value: "125,340", label: "تعداد لینک‌های کوتاه شده" },
  { value: "543", label: "کاربران فعال" },
  { value: "1,230", label: "لینک‌های ایجاد شده امروز" },
];

// Hero Content
export const heroContent: HeroContent = {
  preTitle: "لینک های",
  titleHighlightWords: ["طولانی", "شلوغ", "بی‌آمار", "ناامن"],
  title: "رو کوتاه و مدیریت کن !",
  description:
    "با کوتاهک، لینک‌های طولانی رو در چند ثانیه کوتاه کن. آمار دقیق بازدید، امنیت بالا و مدیریت آسان لینک‌ها، همه در یک پلتفرم ساده و حرفه‌ای.",
  placeholder: "... لینک خود را وارد کنید",
  features: [
    { icon: "Link", title: "کوتاه‌سازی", description: "لینک‌های طولانی" },
    { icon: "BarChart3", title: "آمار دقیق", description: "لحظه‌ای و کامل" },
    { icon: "ShieldCheck", title: "فلان فلان", description: "مطمئن و پایدار" },
  ],
  trustItems: [
    { icon: "Sparkles", text: "محبوب در بین کاربران" },
    { icon: "Clock", text: "پاسخگویی آنی" },
  ],
};

// Problems
export const problemsContent: ProblemsContent = {
  heading: {
    before: "لینک خوب، فقط",
    highlight: "کوتاه",
    after: "نیست",
    description:
      "بیشتر لینک‌هایی که هر روز ساخته میشن، چند مشکل مشترک دارن؛ مشکل‌هایی که روی اعتماد کاربر و نتیجه‌ی کارت تأثیر می‌ذارن.",
  },
  problems: [
    {
      icon: "MousePointerClick",
      title: "اعتماد کم، آمار صفر",
      description:
        "کاربر به آدرس‌های طولانی و عجیب اعتماد نمی‌کنه و کلیک نمی‌کنه. حتی وقتی کلیک کنه، تو هیچ‌وقت نمی‌فهمی از کجا اومد و کِی.",
    },
    {
      icon: "Link2",
      title: "لینک‌های بلند و زشت",
      description:
        "آدرس‌های پر از پارامتر، توی پست و پیام جا نمیشن و به‌سختی توی ذهن می‌مونن.",
    },
    {
      icon: "ShieldQuestion",
      title: "مقصد نامشخص",
      description:
        "کاربر نمی‌دونه لینک به کجا وصله، و همین بی‌اعتمادی باعث میشه کلیک نکنه.",
    },
    {
      icon: "Share2",
      title: "ابزارهای پراکنده",
      description:
        "برای هر لینک باید سراغ یه ابزار جدا بری؛ بدون مدیریت متمرکز و یکپارچه.",
    },
  ],
};

// Solutions
export const solutionContent: SolutionContent = {
  heading: {
    line1: "از لینک‌های طولانی",
    line2Before: "تا",
    highlight: "لینک‌های هوشمند",
  },
  description:
    "کوتاهک لینک‌های طولانی رو در کسری از ثانیه به لینک‌های کوتاه، امن و قابل مدیریت تبدیل میکنه. با آمار لحظه‌ای و کنترل کامل.",
  benefits: [
    { icon: "Link2", text: "کوتاه‌سازی لینک‌های طولانی در چند ثانیه" },
    { icon: "BarChart3", text: "آمار دقیق بازدید و رفتار کاربران" },
    { icon: "ShieldCheck", text: "امنیت بالا و مخفی‌سازی لینک اصلی" },
    { icon: "Clock", text: "مدیریت کامل با ویرایش و تاریخ انقضا" },
  ],
  cta: {
    label: "همین حالا امتحان کن",
    tagline: "سریع • هوشمند • حرفه‌ای",
  },
};

// FAQ
export const faqs = [
  {
    question: "کوتاهک چطور کار میکنه؟",
    answer:
      "شما لینک طولانی خودتون رو وارد میکنید، کوتاهک به صورت خودکار اون رو به یک لینک کوتاه و قابل اشتراک‌گذاری تبدیل میکنه. همچنین میتونید آمار بازدید لینک‌هات رو به صورت لحظه‌ای مشاهده کنید.",
  },
  {
    question: "آیا لینک‌های کوتاه شده تاریخ انقضا دارند؟",
    answer:
      "بله، شما میتونید برای هر لینک تاریخ انقضا مشخص کنید. بعد از تاریخ تعیین شده، لینک غیرفعال میشه و کاربران به صفحه مقصد هدایت نمیشن.",
  },
  {
    question: "چطور میتونم آمار لینک‌های کوتاه شده رو ببینم؟",
    answer:
      "با ورود به داشبورد کاربری خودتون، میتونید لیست تمام لینک‌های کوتاه شده و آمار دقیق بازدید هر کدوم رو مشاهده کنید. آمار شامل تعداد کلیک، موقعیت جغرافیایی و زمان بازدید هست.",
  },
  {
    question: "آیا میتونم لینک کوتاه شده رو ویرایش کنم؟",
    answer:
      "بله، شما میتونید در هر زمان لینک‌های کوتاه شده خودتون رو ویرایش کنید، لینک مقصد رو تغییر بدید یا حتی لینک رو حذف کنید.",
  },
  {
    question: "امنیت لینک‌های من چطور تامین میشه؟",
    answer:
      "لینک‌های اصلی شما کاملاً محافظت میشن و هیچکس به جز خودتون به آدرس اصلی دسترسی نداره. همچنین از پروتکل HTTPS برای انتقال امن اطلاعات استفاده میکنیم.",
  },
];

// Footer
export const footerContent: FooterContent = {
  about: {
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
  },
  usefulLinks: [
    { href: "/1", label: "لینک-1" },
    { href: "/2", label: "لینک-2", external: true },
    { href: "/3", label: "لینک-3" },
    { href: "/4", label: "لینک-4" },
  ],
  statistics: [
    { value: "125,340", label: "تعداد لینک‌های کوتاه شده" },
    { value: "543", label: "کاربران فعال" },
    { value: "1,230", label: "لینک‌های ایجاد شده امروز" },
  ],
  contact: {
    telegram: {
      value: "@kootahak-sup",
      href: "https://t.me/kootahak-sup",
    },
    email: {
      value: "info@kootahak.ir",
      href: "mailto:info@kootahak.ir",
    },
    workingHours: {
      value: "۹ صبح الی ۶ عصر",
    },
    cta: {
      label: "Some Action",
      href: "#",
    },
  },
  socialLinks: [
    { href: "1", icon: "Link2", label: "سوشیال 1" },
    { href: "2", icon: "Link2", label: "سوشیال 2" },
    { href: "3", icon: "Link2", label: "سوشیال 3" },
  ],
};
