import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <section className="container max-w-3xl py-16">
          <span className="label-mono-sm text-foreground/40">Index · About</span>
          <h1 className="mt-3 font-display text-4xl font-light leading-tight md:text-6xl">
            About <span className="text-gradient-iridescent italic">ePuja</span>.
          </h1>
          <div className="mt-8 space-y-5 text-foreground/70 leading-relaxed">
            <p>
              ePuja is a devotional platform inspired by the experience of visiting sacred temples
              across India. It helps devotees book authentic pujas, receive updates and proof of
              completion, and stay connected with temple traditions from anywhere.
            </p>
            <p>
              This experience showcases how a modern devotional product can look and feel — with
              curated pujas, temple partners, and a smooth booking journey.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
