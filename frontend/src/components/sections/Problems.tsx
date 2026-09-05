import { MousePointerClick, Link2, ShieldQuestion, Share2 } from "lucide-react";
import React from "react";

const problems = [
  {
    icon: <MousePointerClick size={20} strokeWidth={1.5} />,
    title: "اعتماد کم، آمار صفر",
    description:
      "کاربر به آدرس‌های طولانی و عجیب اعتماد نمی‌کنه و کلیک نمی‌کنه. حتی وقتی کلیک کنه، تو هیچ‌وقت نمی‌فهمی از کجا اومد و کِی.",
  },
  {
    icon: <Link2 size={20} strokeWidth={1.5} />,
    title: "لینک‌های بلند و زشت",
    description:
      "آدرس‌های پر از پارامتر، توی پست و پیام جا نمیشن و به‌سختی توی ذهن می‌مونن.",
  },
  {
    icon: <ShieldQuestion size={20} strokeWidth={1.5} />,
    title: "مقصد نامشخص",
    description:
      "کاربر نمی‌دونه لینک به کجا وصله، و همین بی‌اعتمادی باعث میشه کلیک نکنه.",
  },
  {
    icon: <Share2 size={20} strokeWidth={1.5} />,
    title: "ابزارهای پراکنده",
    description:
      "برای هر لینک باید سراغ یه ابزار جدا بری؛ بدون مدیریت متمرکز و یکپارچه.",
  },
];

const Problems = (): React.JSX.Element => {
  return (
    <section className="w-full pb-20 pt-25" id="problems">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center gap-x-3 sm:gap-x-7 mb-12">
          <div className="hidden sm:block w-full h-px bg-linear-to-r from-primary/20 to-primafrom-primary/5"></div>
          <div className="text-center sm:shrink-0">
            <h2 className="text-token-3xl sm:text-token-4xl md:text-token-5xl font-token-bold text-foreground leading-token-tight">
              لینک خوب، فقط <span className="text-brand">کوتاه</span> نیست
            </h2>
            <p className="text-token-base text-muted-foreground max-w-xl mx-auto mt-4 leading-token-relaxed">
              بیشتر لینک‌هایی که هر روز ساخته میشن، چند مشکل مشترک دارن؛
              مشکل‌هایی که روی اعتماد کاربر و نتیجه‌ی کارت تأثیر می‌ذارن.
            </p>
          </div>
          <div className="hidden sm:block w-full h-px bg-linear-to-l from-primary/20 to-primafrom-primary/5"></div>
        </div>

        {/* Bento Grid */}
        <div className="mt-10 md:mt-10 max-w-7xl mx-auto w-full flex flex-col gap-4 md:gap-6 relative">
          <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8">
            {/* Card 1: اعتماد و آمار */}
            <div className="feature-trigger w-full md:flex-1">
              <div className="feature-card control group bg-card hover:bg-brand/5 border border-border hover:border-brand/30 transition-all duration-token-normal rounded-token-xl w-full md:flex-1 h-100 relative grid place-items-center">
                <div className="p-8 flex flex-col items-center justify-center gap-3 max-w-md text-center">
                  <div className="p-2.5 rounded-token-sm bg-brand/10 text-brand group-hover:bg-brand/20 transition-colors duration-token-normal">
                    <MousePointerClick size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-token-xl font-token-semibold text-foreground">
                    {problems[0].title}
                  </h3>
                  <p className="text-token-sm text-muted-foreground leading-token-relaxed">
                    {problems[0].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: لینک‌های بلند */}
            <div className="feature-trigger w-full md:w-100">
              <div className="feature-card group bg-card hover:bg-brand/5 border border-border hover:border-brand/30 transition-all duration-token-normal rounded-token-xl w-full md:w-100 h-100 relative grid place-items-center">
                <div className="p-8 flex flex-col items-center justify-center gap-3 max-w-md text-center">
                  <div className="p-2.5 rounded-token-sm bg-brand/10 text-brand group-hover:bg-brand/20 transition-colors duration-token-normal">
                    <Link2 size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-token-xl font-token-semibold text-foreground">
                    {problems[1].title}
                  </h3>
                  <p className="text-token-sm text-muted-foreground leading-token-relaxed">
                    {problems[1].description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8">
            {/* Card 3: مقصد نامشخص */}
            <div className="feature-trigger w-full md:w-100">
              <div className="feature-card group bg-card hover:bg-brand/5 border border-border hover:border-brand/30 transition-all duration-token-normal rounded-token-xl w-full md:w-100 h-100 grid place-items-center gap-3">
                <div className="p-8 flex flex-col items-center justify-center gap-3 max-w-md text-center">
                  <div className="p-2.5 rounded-token-sm bg-brand/10 text-brand group-hover:bg-brand/20 transition-colors duration-token-normal">
                    <ShieldQuestion size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-token-xl font-token-semibold text-foreground text-center">
                    {problems[2].title}
                  </h3>
                  <p className="text-token-sm text-muted-foreground text-center leading-token-relaxed max-w-xs">
                    {problems[2].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: ابزارهای پراکنده */}
            <div className="feature-trigger w-full md:flex-1">
              <div className="feature-card group bg-card hover:bg-brand/5 border border-border hover:border-brand/30 transition-all duration-token-normal rounded-token-xl w-full md:flex-1 h-100 relative grid place-items-center">
                <div className="p-8 flex flex-col items-center justify-center gap-3 max-w-md text-center">
                  <div className="p-2.5 rounded-token-sm bg-brand/10 text-brand group-hover:bg-brand/20 transition-colors duration-token-normal">
                    <Share2 size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-token-xl font-token-semibold text-foreground">
                    {problems[3].title}
                  </h3>
                  <p className="text-token-sm text-muted-foreground leading-token-relaxed">
                    {problems[3].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
