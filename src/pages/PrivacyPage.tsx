import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <section className="container max-w-3xl py-16">
          <span className="label-mono-sm text-foreground/40">Index · Privacy</span>
          <h1 className="mt-3 font-display text-4xl font-light leading-tight md:text-6xl">
            Privacy <span className="text-gradient-iridescent italic">policy</span>.
          </h1>
          <div className="mt-8 space-y-5 text-foreground/70 leading-relaxed">
            <p>
              This is a demo devotional experience. No real personal data or payment information is
              processed here.
            </p>
            <p>
              In production, this page would explain how devotee details, booking information, and
              communication preferences are stored and used, along with data retention and deletion
              policies.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
