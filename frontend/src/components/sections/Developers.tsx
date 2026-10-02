import DeveloperCard from "@/components/developers/DeveloperCard";
import { developersContent } from "@/contents/developers";

const Developers = (): React.JSX.Element => {
  const { heading, developers } = developersContent;

  return (
    <section className="w-full py-8 md:py-12">
      <div className="container">
        <div className="mb-8 flex items-center justify-center gap-x-3 sm:mb-12 sm:gap-x-7">
          <div className="hidden h-px w-full bg-linear-to-r from-primary/20 to-transparent sm:block" />
          <div className="max-w-xl text-center sm:shrink-0">
            <h1 className="text-balance text-token-2xl font-token-bold leading-token-tight text-foreground sm:text-token-4xl md:text-token-5xl">
              {heading.before}{" "}
              <span className="whitespace-nowrap text-brand">
                {heading.highlight}
              </span>{" "}
              {heading.after}
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-token-sm leading-token-relaxed text-muted-foreground sm:mt-4 sm:text-token-base">
              {heading.description}
            </p>
          </div>
          <div className="hidden h-px w-full bg-linear-to-l from-primary/20 to-transparent sm:block" />
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          {developers.map((developer) => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Developers;
