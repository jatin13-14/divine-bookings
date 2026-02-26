import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, User } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🪔</span>
          <span className="font-display text-xl font-bold text-foreground">
            ePuja
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/pujas" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            All Pujas
          </Link>
          <Link to="/temples" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Temples
          </Link>
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
            <Button variant="saffron" size="sm" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
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
            <Link to="/pujas" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>All Pujas</Link>
            <Link to="/temples" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Temples</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>My Bookings</Link>
                <button className="text-left text-sm font-medium text-destructive" onClick={() => { signOut(); setMobileOpen(false); }}>Sign Out</button>
              </>
            ) : (
              <Button variant="saffron" size="sm" onClick={() => { navigate("/auth"); setMobileOpen(false); }}>Sign In</Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
