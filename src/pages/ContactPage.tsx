import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-warm py-12">
          <div className="container max-w-3xl">
            <h1 className="font-display text-3xl font-bold md:text-4xl">Contact</h1>
            <p className="mt-3 text-muted-foreground">
              Have questions about bookings, temples, or pujas? Reach out using the details below.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Email:</span> support@example.com
              </p>
              <p>
                <span className="font-semibold text-foreground">Phone:</span> +91-00000-00000
              </p>
              <p>
                <span className="font-semibold text-foreground">Address:</span> HSR Layout, Bengaluru, Karnataka, India
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

