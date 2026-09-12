import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { footerContent } from "@/contents/landing";
import GetIcon from "@/components/ui/Icon";

const Footer = (): React.JSX.Element => {
  const { about, usefulLinks, statistics, contact, socialLinks } =
    footerContent;

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
              {about.description}
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
                      <span className="block w-1.5 h-0.5 bg-brand rounded-full" />
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-x-1.5 font-token-normal text-token-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="block w-1.5 h-0.5 bg-brand rounded-full" />
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
                  <span className="font-token-bold text-token-sm text-brand bg-brand/10 px-3 py-1 rounded-token-sm group-hover:bg-brand/20 transition-colors">
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
                    href={contact.telegram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="font-token-normal mr-auto hover:text-brand transition-colors"
                  >
                    {contact.telegram.value}
                  </a>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-x-3 gap-y-1.5">
                  <span className="font-token-normal">ایمیل</span>
                  <a
                    href={contact.email.href}
                    dir="ltr"
                    className="font-token-normal mr-auto hover:text-brand transition-colors"
                  >
                    {contact.email.value}
                  </a>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-x-3 gap-y-1.5">
                  <span className="flex items-center gap-x-1.5 font-token-normal">
                    <GetIcon name="Clock" size={14} className="text-brand" />
                    ساعات پاسخگویی
                  </span>
                  <span className="font-token-normal mr-auto hover:text-brand transition-colors">
                    {contact.workingHours.value}
                  </span>
                </div>
              </div>
              <Button size="md" variant="secondary">
                {contact.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="w-full mx-auto mt-4 bg-card border border-border p-2 shadow-token-md">
        <div className="flex items-center justify-between gap-x-4 gap-y-3 flex-wrap p-4 text-muted-foreground text-token-sm">
          <div className="flex items-center gap-x-2">
            <GetIcon name="Globe" size={16} />
            <p className="font-token-normal">
              تمامی حقوق مادی و معنوی این وب‌سایت متعلق به{" "}
              <span className="text-brand font-token-semibold">کوتاهک</span>{" "}
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
                  className="flex items-center justify-center size-10 bg-muted hover:bg-brand/20 transition-colors text-muted-foreground hover:text-brand rounded-token-sm"
                  aria-label={social.label}
                >
                  <GetIcon name={social.icon} size={16} />
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
