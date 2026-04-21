import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <section className="container max-w-3xl py-16">
          <span className="label-mono-sm text-foreground/40">Index · Terms</span>
          <h1 className="mt-3 font-display text-4xl font-light leading-tight md:text-6xl">
            Terms & <span className="text-gradient-iridescent italic">conditions</span>.
          </h1>
          <div className="mt-8 space-y-5 text-foreground/70 leading-relaxed">
            <p>
              This ePuja interface is for demonstration purposes only and does not constitute an
              actual booking service.
            </p>
            <p>
              In a live product, this page would outline the terms of using the platform,
              cancellation and refund policies, limitations of liability, and devotee
              responsibilities when submitting booking details.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
