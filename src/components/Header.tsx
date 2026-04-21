import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronDown, Globe, Menu, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "HI">("EN");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homeHash = (hash: string) => ({ pathname: "/", hash });

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-foreground/20 bg-foreground/[0.03] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
          </span>
          <span className="font-display text-base font-medium tracking-tight">
            ePuja<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {[
            { to: "/", label: "Home" },
            { to: "/pujas", label: "Pujas" },
            { to: "/temples", label: "Temples" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="label-mono px-3 py-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-1.5 label-mono px-3 py-2 text-foreground/70 hover:text-foreground transition-colors">
                Index <ChevronDown className="h-3 w-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="font-mono uppercase tracking-wider text-xs">
              <DropdownMenuItem onClick={() => navigate(homeHash("#special-pujas"))}>Specials</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(homeHash("#services"))}>Services</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(homeHash("#reviews"))}>Reviews</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(homeHash("#faq"))}>FAQs</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-1.5 label-mono-sm rounded-full border border-foreground/15 px-3 py-1.5 text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-all">
                <Globe className="h-3 w-3" />
                {lang}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLang("EN")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("HI")}>हिन्दी</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>My Bookings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/admin")}>Admin Panel</DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
                Sign in
              </Button>
              <Button variant="hero" size="sm" onClick={() => navigate("/pujas")}>
                Book a puja
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground/80"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl p-6 md:hidden">
          <nav className="flex flex-col gap-1">
            {[
              { to: "/", label: "Home" },
              { to: "/pujas", label: "Pujas" },
              { to: "/temples", label: "Temples" },
              { to: "/about", label: "About" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="label-mono py-3 text-foreground/80"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-4 grid gap-2">
              {user ? (
                <>
                  <Button variant="hero" size="sm" onClick={() => { navigate("/dashboard"); setMobileOpen(false); }}>
                    My Bookings
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { signOut(); setMobileOpen(false); }}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="hero" size="sm" onClick={() => { navigate("/pujas"); setMobileOpen(false); }}>
                    Book a puja
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { navigate("/auth"); setMobileOpen(false); }}>
                    Sign in
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
