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
import GradientWaves from "./GradientWaves";

const flipWordsLoop = [
  ...heroContent.titleHighlightWords,
  heroContent.titleHighlightWords[0],
];

const features = [
  {
    icon: <Link size={25} strokeWidth={1.5} />,
    title: heroContent.features[0].title,
    description: heroContent.features[0].description,
  },
  {
    icon: <BarChart3 size={25} strokeWidth={1.5} />,
    title: heroContent.features[1].title,
    description: heroContent.features[1].description,
  },
  {
    icon: <ShieldCheck size={25} strokeWidth={1.5} />,
    title: heroContent.features[2].title,
    description: heroContent.features[2].description,
  },
];

const trustItems = [
  {
    icon: <Sparkles size={16} className="text-brand" />,
    text: heroContent.trustItems[0],
  },
  {
    icon: <Clock size={16} className="text-brand" />,
    text: heroContent.trustItems[1],
  },
];

const Hero = (): React.JSX.Element => {
  return (
    <section className="min-h-screen relative isolate flex flex-col items-center justify-center gap-y-8 md:gap-y-10 lg:gap-y-12 py-16 md:py-20">
      <GradientWaves
        horizonColor="#5227FF"
        waveColor="#FF9FFC"
        crestColor="#FFFFFF"
        speed={0.4}
        amplitude={1.7}
        waveScale={0.6}
        waveRatio={0.9}
        swell={35}
        turbulence={20}
        tilt={1.11}
        zoom={1.65}
        height={5.5}
        fogDepth={23}
        detail="low"
        brightness={1.25}
        opacity={0.68}
        mouseInteraction={true}
        parallaxStrength={0.5}
        grain
        grainIntensity={0.05}
      />
      <div className="container">
        {/* محتوای اصلی (متمرکز) */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* عنوان اصلی - حالا با کلمه‌ی متحرک flip-words */}
          <h1 className="text-token-4xl sm:text-token-5xl md:text-token-6xl lg:text-token-7xl font-token-bold text-foreground leading-token-tight">
            {heroContent.preTitle}{" "}
            <span className="flip-words-wrapper">
              <span className="flip-words-track">
                {flipWordsLoop.map((word, index) => (
                  <span key={index} className="flip-word">
                    {word}
                  </span>
                ))}
              </span>
            </span>{" "}
            {heroContent.title}
          </h1>

          {/* توضیحات */}
          <p className="mt-4 text-token-sm sm:text-token-base font-token-normal text-muted-foreground/80 leading-token-relaxed max-w-xl">
            {heroContent.description}
          </p>

          {/* فرم ترغیب کننده کاربر */}
          <form className="mt-8 flex items-center justify-between gap-x-4 w-full max-w-lg bg-card border border-border py-2.5 pr-5 pl-2.5 rounded-token-md shadow-token-sm transition-all duration-300 focus-within:border-brand/50 focus-within:shadow-token-md">
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

          {/* ویژگی‌ها */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-x-3 p-3 rounded-token-sm bg-card border border-border hover:border-brand/30 hover:bg-brand/10 transition-all duration-300 cursor-default group"
              >
                <div className="p-1.5 rounded-token-sm bg-brand/10 text-brand group-hover:bg-brand/20 transition-colors">
                  {feature.icon}
                </div>
                <div className="text-right">
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

          {/* نشان اعتماد */}
          <div className="mt-8 flex items-center justify-center gap-x-6 text-token-xs text-primary/70">
            {trustItems.map((item, index) => (
              <span key={index} className="flex items-center gap-x-1">
                {item.icon}
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
