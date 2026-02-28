import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🪔</span>
              <span className="font-display text-lg font-bold">ePuja</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Book authentic temple pujas performed across India. Receive updates, proof, and prasad delivery—wherever you are.
            </p>
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +91-00000-00000
              </div>
              <div className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@example.com
              </div>
              <div className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4" />
                <span>HSR Layout, Bengaluru, Karnataka, India</span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 text-muted-foreground">
              <a
                className="hover:text-foreground transition-colors"
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                className="hover:text-foreground transition-colors"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                className="hover:text-foreground transition-colors"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                className="hover:text-foreground transition-colors"
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                className="hover:text-foreground transition-colors"
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/pujas" className="hover:text-foreground transition-colors">Book a Puja</Link></li>
              <li><Link to="/temples" className="hover:text-foreground transition-colors">Temples</Link></li>
              <li><Link to={{ pathname: "/", hash: "#services" }} className="hover:text-foreground transition-colors">Explore services</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to={{ pathname: "/", hash: "#faq" }} className="hover:text-foreground transition-colors">FAQs</Link></li>
              <li><Link to={{ pathname: "/", hash: "#reviews" }} className="hover:text-foreground transition-colors">Reviews</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">My bookings</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ePuja. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
