"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import type { FaqItem } from "@/lib/sanity/queries";

export function Faq({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <section id="faqs" className="bg-night py-20 lg:py-28">
      <div className="container-prose">
        <div className="mb-10 text-center">
          <p className="eyebrow mb-4 justify-center text-gold">FAQ</p>
          <SplitReveal className="font-display text-4xl uppercase leading-[0.95] md:text-6xl">
            Questions fréquentes
          </SplitReveal>
        </div>

        <Reveal>
          <Accordion type="single" collapsible className="rounded-6 border border-white/10 bg-white/5 px-6">
            {faqs.map((f, i) => (
              <AccordionItem key={f._id || i} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}