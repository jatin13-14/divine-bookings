import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background/80 backdrop-blur-md">
      {/* Iridescent hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-iridescent opacity-40" />

      <div className="container py-16">
        {/* Top mega-mark */}
        <div className="mb-12 flex flex-col items-start gap-3">
          <span className="label-mono-sm text-foreground/50">Index · 00</span>
          <h3 className="font-display text-5xl font-light leading-none md:text-7xl">
            <span className="text-gradient-iridescent italic">Devotion</span>,
            <br />
            <span className="text-foreground/80">delivered.</span>
          </h3>
        </div>

        <div className="hairline mb-12" />

        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand column */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-foreground/20">
                <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
              </span>
              <span className="font-display text-base font-medium">
                ePuja<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-foreground/60 leading-relaxed">
              Book authentic temple pujas performed across India.
              Updates, proof, and prasad — wherever you are.
            </p>
            <div className="mt-6 space-y-1.5 label-mono-sm text-foreground/50">
              <div>+91 · 00000 · 00000</div>
              <div>support@epuja.in</div>
              <div>Bengaluru · India</div>
            </div>
          </div>

          {/* Links columns */}
          <div className="md:col-span-2">
            <h4 className="label-mono-sm text-foreground/40">01 · Services</h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { to: "/pujas", label: "Book Puja" },
                { to: "/temples", label: "Temples" },
                { to: { pathname: "/", hash: "#services" }, label: "Explore" },
              ].map((l, i) => (
                <li key={i}>
                  <Link to={l.to as any} className="text-sm text-foreground/80 hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="label-mono-sm text-foreground/40">02 · Support</h4>
            <ul className="mt-4 space-y-2.5">
              <li><Link to={{ pathname: "/", hash: "#faq" }} className="text-sm text-foreground/80 hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to={{ pathname: "/", hash: "#reviews" }} className="text-sm text-foreground/80 hover:text-primary transition-colors">Reviews</Link></li>
              <li><Link to="/dashboard" className="text-sm text-foreground/80 hover:text-primary transition-colors">My bookings</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="label-mono-sm text-foreground/40">03 · Studio</h4>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/about" className="text-sm text-foreground/80 hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-sm text-foreground/80 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-sm text-foreground/80 hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-sm text-foreground/80 hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-border/50 pt-6 md:flex-row md:items-center">
          <p className="label-mono-sm text-foreground/40">
            © {new Date().getFullYear()} ePuja · All rights reserved
          </p>
          <div className="flex items-center gap-4 text-foreground/50">
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-primary transition-colors">
              <Youtube className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-primary transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
