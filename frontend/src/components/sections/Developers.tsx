import DeveloperCard from "@/components/developers/DeveloperCard";
import { developersContent } from "@/contents/developers";

const Developers = (): React.JSX.Element => {
  const { heading, developers } = developersContent;

  return (
    <section className="w-full py-8 md:py-12">
      <div className="container">
        <div className="flex items-center justify-center gap-x-3 sm:gap-x-7 mb-12">
          <div className="hidden sm:block w-full h-px bg-linear-to-r from-primary/20 to-primafrom-primary/5" />
          <div className="text-center sm:shrink-0">
            <h1 className="text-token-3xl sm:text-token-4xl md:text-token-5xl font-token-bold text-foreground leading-token-tight">
              {heading.before}{" "}
              <span className="text-brand">{heading.highlight}</span>{" "}
              {heading.after}
            </h1>
            <p className="text-token-base text-muted-foreground max-w-xl mx-auto mt-4 leading-token-relaxed">
              {heading.description}
            </p>
          </div>
          <div className="hidden sm:block w-full h-px bg-linear-to-l from-primary/20 to-primafrom-primary/5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {developers.map((developer) => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Developers;
