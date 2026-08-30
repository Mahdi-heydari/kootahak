// components/sections/Hero.tsx
import {
  ArrowLeftFromLine,
  Link,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Clock,
} from "lucide-react";
import Button from "../ui/Button";
import { heroContent } from "@/contents/landing";

const features = [
  {
    icon: <Link size={16} strokeWidth={1.5} />,
    title: heroContent.features[0].title,
    description: heroContent.features[0].description,
  },
  {
    icon: <BarChart3 size={16} strokeWidth={1.5} />,
    title: heroContent.features[1].title,
    description: heroContent.features[1].description,
  },
  {
    icon: <ShieldCheck size={16} strokeWidth={1.5} />,
    title: heroContent.features[2].title,
    description: heroContent.features[2].description,
  },
];

const trustItems = [
  {
    icon: <Sparkles size={12} className="text-info" />,
    text: heroContent.trustItems[0],
  },
  {
    icon: <Clock size={12} className="text-info" />,
    text: heroContent.trustItems[1],
  },
];
const Hero = (): React.JSX.Element => {
  return (
    <section className="flex flex-col-reverse gap-y-10 lg:gap-y-0 lg:flex-row items-center justify-between pb-10 sm:pb-16 lg:pb-20 pt-44">
      {/* Right Content */}
      <div className="flex flex-col gap-y-8 md:gap-y-10 w-full lg:w-125 xl:w-140">
        <div className="cursor-default mx-auto lg:ml-0 text-center lg:text-right">
          {/* Title */}
          <div className="text-token-3xl sm:text-token-4xl md:text-token-5xl font-token-bold text-foreground leading-token-tight">
            <div className="flex items-center justify-center lg:justify-start gap-x-2.5 flex-wrap">
              <div className="relative inline-flex items-center justify-center px-2 sm:px-3 h-14 sm:h-15 text-info bg-info/10 border border-border">
                <h1 className="block">{heroContent.titleHighlight}</h1>
              </div>
              <span>{heroContent.title}</span>
            </div>
            <p className="mt-1">{heroContent.subtitle}</p>
          </div>

          {/* Description */}
          <p className="text-token-sm sm:text-token-base font-token-normal text-muted-foreground mt-4 leading-token-relaxed max-w-lg mx-auto lg:mx-0">
            {heroContent.description}
          </p>
        </div>

        {/* Start Form */}
        <form className="flex items-center justify-between gap-x-4 bg-card border border-border py-2.5 pr-5 pl-2.5 rounded-token-md shadow-token-sm">
          <input
            type="text"
            dir="ltr"
            className="w-full placeholder:text-end text-token-sm sm:text-token-base placeholder:font-token-normal placeholder:text-muted-foreground bg-transparent outline-none text-foreground"
            placeholder={heroContent.placeholder}
          />
          <Button type="submit" variant="primary">
            <ArrowLeftFromLine size={18} />
          </Button>
        </form>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-x-3 p-3 rounded-token-sm bg-card border border-border hover:border-info/30 hover:bg-info/5 transition-all duration-300 cursor-default group"
            >
              <div className="p-1.5 rounded-token-sm bg-info/10 text-info group-hover:bg-info/20 transition-colors">
                {feature.icon}
              </div>
              <div>
                <p className="text-token-xs font-token-medium text-foreground">
                  {feature.title}
                </p>
                <p className="text-token-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="flex items-center justify-center lg:justify-start gap-x-6 text-token-xs text-muted-foreground/70">
          {trustItems.map((item, index) => (
            <span key={index} className="flex items-center gap-x-1">
              {item.icon}
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Image Placeholder */}
      <div className="w-2/3 sm:w-1/2 lg:w-[40%]">
        <div className="w-full aspect-square bg-info/5 rounded-token-xl border border-border flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-info/5" />

          <div className="relative z-10 flex flex-col items-center gap-y-4">
            <span className="text-token-2xl text-foreground font-token-bold tracking-token-tight">
              کوتاهک
            </span>
            <span className="text-token-xs text-muted-foreground font-token-normal">
              کوتاه‌ترین مسیر
            </span>
          </div>

          {/* Decorative dots */}
          <div className="absolute top-4 right-4 flex gap-x-1">
            <div className="size-1.5 rounded-full bg-info/30" />
            <div className="size-1.5 rounded-full bg-info/20" />
            <div className="size-1.5 rounded-full bg-info/10" />
          </div>
          <div className="absolute bottom-4 left-4 flex gap-x-1">
            <div className="size-1.5 rounded-full bg-info/10" />
            <div className="size-1.5 rounded-full bg-info/20" />
            <div className="size-1.5 rounded-full bg-info/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
