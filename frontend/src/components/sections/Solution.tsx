import React from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import KutahakGraph from "@/components/KutahakGraph";
import { solutionContent } from "@/contents/landing";

const Solution = (): React.JSX.Element => {
  const { heading, description, benefits, cta } = solutionContent;

  return (
    <section
      className="py-20 pb-0 bg-background scroll-mt-16 md:scroll-mt-24"
      id="solution"
    >
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-right">
          <h2 className="text-token-4xl md:text-token-5xl font-token-bold text-foreground mb-4 leading-token-tight">
            {heading.line1}
            <br />
            {heading.line2Before}{" "}
            <span className="text-brand">{heading.highlight}</span>
          </h2>
          <p className="text-token-base text-muted-foreground leading-token-relaxed mb-6 max-w-lg mx-auto lg:mx-0">
            {description}
          </p>

          {/* Benefits List */}
          <div className="space-y-3 max-w-lg mx-auto lg:mx-0">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-x-3 p-3 bg-card border border-border rounded-token-sm hover:border-brand/30 transition-colors duration-300"
              >
                <div className="shrink-0 text-brand">
                  <Icon name={item.icon} size={18} strokeWidth={1.5} />
                </div>
                <span className="text-token-sm text-muted-foreground">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex items-center justify-center lg:justify-start gap-x-4">
            <Button size="md" variant="primary">
              {cta.label}
            </Button>
            <span className="text-token-sm text-muted-foreground">
              {cta.tagline}
            </span>
          </div>
        </div>

        {/* Right Content - SVG Animation */}
        <div className="flex-1 w-full">
          <KutahakGraph />
        </div>
      </div>
    </section>
  );
};

export default Solution;
