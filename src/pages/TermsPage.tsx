import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-warm py-12">
          <div className="container max-w-3xl">
            <h1 className="font-display text-3xl font-bold md:text-4xl">Terms & Conditions</h1>
            <p className="mt-3 text-muted-foreground">
              This ePuja interface is for demonstration purposes only and does not constitute an actual booking service.
            </p>
            <p className="mt-4 text-muted-foreground">
              In a live product, this page would outline the terms of using the platform, cancellation and refund
              policies, limitations of liability, and devotee responsibilities when submitting booking details.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

