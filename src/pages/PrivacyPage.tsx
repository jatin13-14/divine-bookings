import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-warm py-12">
          <div className="container max-w-3xl">
            <h1 className="font-display text-3xl font-bold md:text-4xl">Privacy Policy</h1>
            <p className="mt-3 text-muted-foreground">
              This is a demo devotional experience. No real personal data or payment information is processed here.
            </p>
            <p className="mt-4 text-muted-foreground">
              In a production setup, this page would explain how devotee details, booking information, and communication
              preferences are stored and used, along with data retention and deletion policies.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

