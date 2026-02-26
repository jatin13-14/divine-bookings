import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🪔</span>
              <span className="font-display text-lg font-bold">ePuja</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Book authentic Hindu pujas performed at sacred temples across India. Receive divine blessings from anywhere in the world.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/pujas" className="hover:text-foreground transition-colors">All Pujas</Link></li>
              <li><Link to="/temples" className="hover:text-foreground transition-colors">Temples</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="cursor-default">How It Works</span></li>
              <li><span className="cursor-default">FAQs</span></li>
              <li><span className="cursor-default">Contact Us</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Trust & Safety</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Verified temple partners</li>
              <li>✓ Video proof of puja</li>
              <li>✓ Prasad delivery</li>
              <li>✓ Secure payments</li>
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
