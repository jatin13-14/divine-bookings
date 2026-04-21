import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <section className="container max-w-3xl py-16">
          <span className="label-mono-sm text-foreground/40">Index · Contact</span>
          <h1 className="mt-3 font-display text-4xl font-light leading-tight md:text-6xl">
            Get in <span className="text-gradient-iridescent italic">touch</span>.
          </h1>
          <p className="mt-4 max-w-md text-sm text-foreground/60">
            Questions about bookings, temples, or pujas? Reach out using the details below.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Email", value: "support@epuja.in" },
              { label: "Phone", value: "+91 · 00000 · 00000" },
              { label: "Address", value: "Bengaluru, India" },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-md">
                <div className="label-mono-sm text-foreground/40">{c.label}</div>
                <div className="mt-2 font-display text-lg font-light">{c.value}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
