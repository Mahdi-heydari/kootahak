// components/sections/FAQ.tsx
"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { faqs } from "@/contents/landing";

const FAQ = (): React.JSX.Element => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20" id="faq">
      {/* Header */}
      <div className="flex items-center justify-center gap-x-3 sm:gap-x-7 mb-12">
        <div className="hidden sm:block w-full h-px bg-linear-to-r from-primary/20 to-primafrom-primary/5"></div>
        <div className="text-center sm:shrink-0">
          <h2 className="text-token-4xl md:text-token-5xl font-token-bold text-foreground mb-4">
            سوالات <span className="text-brand">پر تکرار</span>
          </h2>
          <p className="text-token-base text-muted-foreground max-w-2xl mx-auto leading-token-relaxed">
            پاسخ سوالات رایجی که ممکنه در ذهنتون باشه
          </p>
        </div>
        <div className="hidden sm:block w-full h-px bg-linear-to-l from-primary/20 to-primafrom-primary/5"></div>
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-token-lg overflow-hidden transition-all duration-300 hover:border-brand/20"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-5 text-right hover:bg-muted/30 transition-colors duration-200 group"
              aria-expanded={openIndex === index}
            >
              <span className="text-token-base font-token-medium text-foreground flex-1">
                {faq.question}
              </span>
              <span className="shrink-0 text-muted-foreground mr-4 transition-transform duration-500 ease-in-out group-hover:text-brand">
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-500 ease-in-out ${
                    openIndex === index ? "rotate-180 text-brand" : ""
                  }`}
                />
              </span>
            </button>

            <div
              className={`grid transition-all duration-500 ease-in-out ${
                openIndex === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-5 text-token-sm text-muted-foreground leading-token-relaxed border-t border-border">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="flex items-baseline justify-center gap-2.5 mt-12 text-center">
        <p className="text-token-sm text-muted-foreground mb-4">
          سوال دیگه‌ای داری؟
        </p>
        <Button size="lg" variant="primary">
          تماس با پشتیبانی
        </Button>
      </div>
    </section>
  );
};

export default FAQ;
