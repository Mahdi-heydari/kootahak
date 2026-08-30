import React from "react";
import Link from "next/link";
import { Link2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { usefulLinks, statistics } from "@/contents/landing";

const Footer = (): React.JSX.Element => {
  const socialLinks = [
    {
      href: "1",
      icon: <Link2 size={16} />,
      label: "سوشیال 1",
    },
    {
      href: "2",
      icon: <Link2 size={16} />,
      label: "سوشیال 2",
    },
    {
      href: "3",
      icon: <Link2 size={16} />,
      label: "سوشیال 3",
    },
  ];

  return (
    <footer>
      <div className="w-full bg-card border border-border py-6 sm:pt-8 lg:pt-12 px-6 sm:px-8 md:px-12 sm:pb-8 shadow-token-md cursor-default">
        <div className="flex md:justify-between flex-wrap gap-y-5 lg:flex-nowrap gap-x-5 xl:gap-x-12">
          {/* About Section */}
          <div className="flex flex-col gap-y-3 sm:gap-y-6 w-full lg:w-70 xl:w-90">
            <span className="font-token-semibold text-token-base text-foreground">
              درباره ما
            </span>
            <p className="font-token-normal text-token-sm text-muted-foreground leading-token-relaxed">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
              نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </p>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col gap-y-3 sm:gap-y-6">
            <p className="font-token-semibold text-token-base text-foreground">
              لینک های مفید
            </p>
            <ul className="flex flex-col gap-y-2.5">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-x-1.5 font-token-normal text-token-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="block w-1.5 h-0.5 bg-info rounded-full" />
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-x-1.5 font-token-normal text-token-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="block w-1.5 h-0.5 bg-info rounded-full" />
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Statistics */}
          <div className="flex flex-col gap-y-3 sm:gap-y-6">
            <p className="font-token-semibold text-token-base text-foreground">
              آمار و ارقام
            </p>
            <ul className="flex flex-col gap-y-3">
              {statistics.map((stat, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-x-4 group"
                >
                  <span className="font-token-normal text-token-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.label}
                  </span>
                  <span className="font-token-bold text-token-sm text-info bg-info/10 px-3 py-1 rounded-token-sm group-hover:bg-info/20 transition-colors">
                    {stat.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-y-3 sm:gap-y-6 w-full sm:w-70 xl:w-80">
            <p className="font-token-semibold text-token-base text-foreground">
              ارتباط با ما
            </p>
            <div className="flex flex-col justify-between h-full gap-y-8">
              <div className="flex flex-col gap-y-3 text-token-sm text-muted-foreground">
                <div className="flex items-center justify-between flex-wrap gap-x-3 gap-y-1.5">
                  <span className="font-token-normal">پشتیبان تلگرام</span>
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="font-token-normal mr-auto hover:text-info transition-colors"
                  >
                    @kootahak-sup
                  </a>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-x-3 gap-y-1.5">
                  <span className="font-token-normal">ایمیل</span>
                  <a
                    href="mailto:"
                    dir="ltr"
                    className="font-token-normal mr-auto hover:text-info transition-colors"
                  >
                    info@kootahak.ir
                  </a>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-x-3 gap-y-1.5">
                  <span className="font-token-normal">ساعات پاسخگویی</span>
                  <a
                    href="mailto:"
                    className="font-token-normal  mr-auto hover:text-info transition-colors"
                  >
                    9 صبح الی 6 عصر
                  </a>
                </div>
              </div>
              <Button size="md" variant="secondary">
                Some Action
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="w-full mx-auto mt-4 bg-card border border-border p-2 shadow-token-md">
        {/* Footer Bottom */}
        <div className="flex items-center justify-between gap-x-4 gap-y-3 flex-wrap p-4 bg-muted/30 text-muted-foreground text-token-sm rounded-token-sm">
          <div className="flex items-center gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="size-4"
              fill="none"
            >
              <path
                d="M7.9987 14.6668C4.3187 14.6668 1.33203 11.6802 1.33203 8.00016C1.33203 4.32016 4.3187 1.3335 7.9987 1.3335C11.6787 1.3335 14.6654 4.32016 14.6654 8.00016C14.6654 11.6802 11.6787 14.6668 7.9987 14.6668Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.91886 10.0002C9.44553 10.4135 8.83219 10.6668 8.15885 10.6668C6.68552 10.6668 5.49219 9.4735 5.49219 8.00016C5.49219 6.52683 6.68552 5.3335 8.15885 5.3335C8.83219 5.3335 9.44553 5.58683 9.91886 6.00016"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="font-token-normal">
              تمامی حقوق مادی و معنوی این وب‌سایت متعلق به{" "}
              <span className="text-info font-token-semibold">کوتاهک</span>{" "}
              میباشد.
            </p>
          </div>
          {/* Social Links */}
          <div className="flex items-center justify-between flex-wrap gap-x-3 gap-y-1.5">
            <span className="font-token-normal text-token-sm text-muted-foreground">
              شبکه های اجتماعی
            </span>
            <div className="flex gap-x-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center size-10 bg-muted hover:bg-info/20 transition-colors text-muted-foreground hover:text-info rounded-token-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
