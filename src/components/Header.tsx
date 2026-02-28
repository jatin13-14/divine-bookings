import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronDown, Globe, Mail, Menu, Phone, User, X } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "HI">("EN");

  const homeHash = (hash: string) => ({ pathname: "/", hash });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="hidden border-b border-border bg-card/60 md:block">
        <div className="container flex h-10 items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
              Help: +91-00000-00000
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" />
              support@example.com
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="h-3.5 w-3.5" />
                {lang}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLang("EN")}>English (EN)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("HI")}>हिन्दी (HI)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🪔</span>
          <span className="font-display text-xl font-bold text-foreground">
            ePuja
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link to="/pujas" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pujas
          </Link>
          <Link to="/temples" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Temples
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Explore
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => navigate(homeHash("#special-pujas"))}>
                Special pujas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(homeHash("#services"))}>
                Services
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(homeHash("#reviews"))}>
                Reviews
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(homeHash("#faq"))}>
                FAQs
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  My Bookings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/admin")}>
                  Admin Panel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
                Sign in
              </Button>
              <Button variant="saffron" size="sm" onClick={() => navigate("/pujas")}>
                Book a puja
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-card p-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link to="/" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/pujas" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Pujas</Link>
            <Link to="/temples" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Temples</Link>
            <button
              className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => {
                navigate(homeHash("#services"));
                setMobileOpen(false);
              }}
            >
              Services
            </button>
            <button
              className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => {
                navigate(homeHash("#faq"));
                setMobileOpen(false);
              }}
            >
              FAQs
            </button>
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>My Bookings</Link>
                <button className="text-left text-sm font-medium text-destructive" onClick={() => { signOut(); setMobileOpen(false); }}>Sign Out</button>
              </>
            ) : (
              <div className="mt-2 grid gap-2">
                <Button variant="saffron" size="sm" onClick={() => { navigate("/pujas"); setMobileOpen(false); }}>
                  Book a puja
                </Button>
                <Button variant="outline" size="sm" onClick={() => { navigate("/auth"); setMobileOpen(false); }}>
                  Sign in
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
