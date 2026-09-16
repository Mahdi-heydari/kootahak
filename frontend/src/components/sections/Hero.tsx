import GetIcon from "@/components/ui/Icon";
import Button from "../ui/Button";
import { heroContent } from "@/contents/landing";

const flipWordsLoop = [
  ...heroContent.titleHighlightWords,
  heroContent.titleHighlightWords[0],
];

const Hero = (): React.JSX.Element => {
  return (
    <section
      id="hero"
      className="hero min-h-screen w-full flex flex-col items-center justify-center gap-y-8 md:gap-y-10 lg:gap-y-12 py-16 md:py-20"
    >
      <div className="container">
        {/* محتوای اصلی (متمرکز) */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* flip-words */}
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
              <GetIcon name="ArrowLeftFromLine" size={18} />
            </Button>
          </form>

          {/* ویژگی‌ها */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl">
            {heroContent.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-x-4 p-3 rounded-token-sm bg-card border border-border hover:border-brand/30 hover:bg-brand/10 transition-all duration-300 cursor-default group"
              >
                <div className="p-1.5 rounded-token-sm bg-brand/10 text-brand group-hover:bg-brand/20 transition-colors">
                  <GetIcon name={feature.icon} size={25} strokeWidth={1.5} />
                </div>
                <div className="text-right space-y-2">
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
            {heroContent.trustItems.map((item, index) => (
              <span key={index} className="flex items-center gap-x-1">
                <GetIcon name={item.icon} size={16} className="text-brand" />
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
