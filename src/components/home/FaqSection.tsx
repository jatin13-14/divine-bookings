import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Can a puja done on my behalf be effective?",
    a: "Yes—when performed with proper sankalp (intent) and correct vidhi (ritual), a puja can be offered in your name even if you’re not physically present.",
  },
  {
    q: "Do I receive any proof of the ceremony?",
    a: "You can receive updates and proof based on the temple’s process (e.g., photos/videos). This depends on the specific puja and partner temple.",
  },
  {
    q: "How do I choose the right puja?",
    a: "Browse by deity, intent (peace, prosperity, protection), or temple. The puja details page includes benefits and preparation guidance when available.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="bg-gradient-warm py-16 md:py-20">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">FAQs</h2>
          <p className="mt-2 text-muted-foreground">Quick answers before you book</p>
        </div>

        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-2 shadow-card">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-border">
                <AccordionTrigger className="px-4 text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

