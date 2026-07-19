import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/Reveal";
import { faqs } from "@/lib/data";

export function Faq() {
  return (
    <section id="faqs" className="bg-night py-20 lg:py-28">
      <div className="container-prose">
        <Reveal className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold">
            FAQ
          </p>
          <h2 className="font-display text-3xl tracking-tight-48 md:text-5xl">
            Questions fréquentes
          </h2>
        </Reveal>

        <Reveal>
          <Accordion type="single" collapsible className="rounded-6 border border-white/10 bg-white/5 px-6">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
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