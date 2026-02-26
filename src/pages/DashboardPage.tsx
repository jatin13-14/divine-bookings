import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, Navigate } from "react-router-dom";

const statusColors: Record<string, string> = {
  pending: "bg-gold/20 text-temple-brown",
  confirmed: "bg-primary/15 text-primary",
  scheduled: "bg-primary/15 text-primary",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-destructive/15 text-destructive",
};

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["my-bookings", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, pujas(name, deity, image_url, temples(name))")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (authLoading) return null;
  if (!user) return <Navigate to="/auth" />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">My Bookings</h1>
          <p className="mt-1 text-muted-foreground">Track your puja bookings and view details</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" />)}
          </div>
        ) : bookings && bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="shadow-card">
                <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-lg overflow-hidden bg-muted shrink-0">
                      {booking.pujas?.image_url ? (
                        <img src={booking.pujas.image_url} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-2xl">🙏</div>
                      )}
                    </div>
                    <div>
                      <p className="font-display font-semibold">{booking.pujas?.name ?? "Puja"}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.booking_date} • {booking.booking_number}
                      </p>
                      <p className="text-xs text-muted-foreground">{booking.devotee_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={statusColors[booking.status] ?? ""}>{booking.status}</Badge>
                    <span className="font-display font-bold text-primary">₹{booking.payment_amount.toLocaleString("en-IN")}</span>
                    {booking.video_link && (
                      <a href={booking.video_link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                        📹 Video
                      </a>
                    )}
                    {booking.tracking_number && (
                      <span className="text-xs text-muted-foreground">📦 {booking.tracking_number}</span>
                    )}
                    {booking.status === "completed" && booking.pujas && (
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/book/${booking.puja_id}`}>Rebook</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-4xl mb-4">🪔</p>
            <h2 className="font-display text-xl font-semibold mb-2">No Bookings Yet</h2>
            <p className="text-muted-foreground mb-4">Start your spiritual journey by booking a puja</p>
            <Button variant="saffron" asChild>
              <Link to="/pujas">Explore Pujas</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
