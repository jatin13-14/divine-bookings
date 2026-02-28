import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-warm py-12">
          <div className="container max-w-3xl">
            <h1 className="font-display text-3xl font-bold md:text-4xl">About ePuja</h1>
            <p className="mt-3 text-muted-foreground">
              ePuja is a devotional platform inspired by the experience of visiting sacred temples across India. It
              helps devotees book authentic pujas, receive updates and proof of completion, and stay connected with
              temple traditions from anywhere.
            </p>
            <p className="mt-4 text-muted-foreground">
              This demo experience showcases how a modern devotional product can look and feel — with curated pujas,
              temple partners, and a smooth booking journey — while keeping the backend optional so you can explore
              the interface freely.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

