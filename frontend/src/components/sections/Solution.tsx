import { Link2, ShieldCheck, BarChart3, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import React from "react";
import KutahakGraph from "@/components/sections/KutahakGraph";

const Solution = (): React.JSX.Element => {
  const benefits = [
    {
      icon: <Link2 size={18} strokeWidth={1.5} />,
      text: "کوتاه‌سازی لینک‌های طولانی در چند ثانیه",
    },
    {
      icon: <BarChart3 size={18} strokeWidth={1.5} />,
      text: "آمار دقیق بازدید و رفتار کاربران",
    },
    {
      icon: <ShieldCheck size={18} strokeWidth={1.5} />,
      text: "امنیت بالا و مخفی‌سازی لینک اصلی",
    },
    {
      icon: <Clock size={18} strokeWidth={1.5} />,
      text: "مدیریت کامل با ویرایش و تاریخ انقضا",
    },
  ];

  return (
    <section className="py-20 pb-0 bg-background" id="solution">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-right">
          <h2 className="text-token-4xl md:text-token-5xl font-token-bold text-foreground mb-4 leading-token-tight">
            از لینک‌های طولانی
            <br />
            تا <span className="text-brand">لینک‌های هوشمند</span>
          </h2>
          <p className="text-token-base text-muted-foreground leading-token-relaxed mb-6 max-w-lg mx-auto lg:mx-0">
            کوتاهک لینک‌های طولانی رو در کسری از ثانیه به لینک‌های کوتاه، امن و
            قابل مدیریت تبدیل میکنه. با آمار لحظه‌ای و کنترل کامل.
          </p>

          {/* Benefits List */}
          <div className="space-y-3 max-w-lg mx-auto lg:mx-0">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-x-3 p-3 bg-card border border-border rounded-token-sm hover:border-brand/30 transition-colors duration-300"
              >
                <div className="shrink-0 text-brand">{item.icon}</div>
                <span className="text-token-sm text-muted-foreground">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex items-center justify-center lg:justify-start gap-x-4">
            <Button size="md" variant="primary">
              همین حالا امتحان کن
            </Button>
            <span className="text-token-sm text-muted-foreground">
              سریع • هوشمند • حرفه‌ای
            </span>
          </div>
        </div>

        {/* Right Content - SVG Animation */}
        <div className="flex-1 w-full ">
          <KutahakGraph></KutahakGraph>
        </div>
      </div>
    </section>
  );
};

export default Solution;
