import React from "react";
import Link from "next/link";
import { footerContent } from "@/contents/landing";
import GetIcon from "@/components/ui/Icon";

const Footer = (): React.JSX.Element => {
  const { about, statistics, contact, socialLinks } = footerContent;

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
            <Link
              href={contact.developers.href}
              className="inline-flex w-fit font-token-normal text-token-sm text-muted-foreground hover:text-brand transition-colors"
            >
              {contact.developers.label}
            </Link>
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
