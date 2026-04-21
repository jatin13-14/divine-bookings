import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Can a puja done on my behalf be effective?",
    a: "Yes — when performed with proper sankalp (intent) and correct vidhi (ritual), a puja can be offered in your name even if you're not physically present.",
  },
  {
    q: "Do I receive any proof of the ceremony?",
    a: "You can receive updates and proof based on the temple's process (e.g. photos / videos). This depends on the specific puja and partner temple.",
  },
  {
    q: "How do I choose the right puja?",
    a: "Browse by deity, intent (peace, prosperity, protection), or temple. The puja details page includes benefits and preparation guidance when available.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="relative py-24">
      <div className="absolute inset-0 grid-cosmic opacity-40" />
      <div className="container relative grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="label-mono-sm text-foreground/40">Index · 05 / FAQ</span>
          <h2 className="mt-3 font-display text-4xl font-light leading-tight md:text-5xl">
            Quick
            <br />
            <span className="text-gradient-iridescent italic">answers</span>,
            <br />
            before you book.
          </h2>
          <p className="mt-4 max-w-xs text-sm text-foreground/60">
            Everything devotees usually want to know in one place.
          </p>
        </div>

        <div className="md:col-span-8">
          <Accordion type="single" collapsible className="w-full divide-y divide-border/60 border-y border-border/60">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={f.q} className="border-0">
                <AccordionTrigger className="group py-6 text-left hover:no-underline">
                  <div className="flex items-baseline gap-6 text-left">
                    <span className="label-mono-sm text-foreground/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg font-light text-foreground transition-colors group-hover:text-primary md:text-2xl">
                      {f.q}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-14 pb-6 text-base leading-relaxed text-foreground/65">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
