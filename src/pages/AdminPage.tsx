import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check admin role
  const { data: roles } = useQuery({
    queryKey: ["user-roles", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user!.id);
      return data?.map((r) => r.role) ?? [];
    },
    enabled: !!user,
  });

  const isAdmin = roles?.includes("admin");

  // Pujas
  const { data: pujas } = useQuery({
    queryKey: ["admin-pujas"],
    queryFn: async () => {
      const { data } = await supabase.from("pujas").select("*, temples(name)").order("created_at", { ascending: false });
      return data ?? [];
    },
    enabled: isAdmin,
  });

  // Temples
  const { data: temples } = useQuery({
    queryKey: ["admin-temples"],
    queryFn: async () => {
      const { data } = await supabase.from("temples").select("*").order("created_at", { ascending: false });
      return data ?? [];
    },
    enabled: isAdmin,
  });

  // Bookings
  const { data: bookings } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const { data } = await supabase.from("bookings").select("*, pujas(name, deity)").order("created_at", { ascending: false });
      return data ?? [];
    },
    enabled: isAdmin,
  });

  const updateBooking = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Record<string, any> }) => {
      const { error } = await supabase.from("bookings").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
      toast({ title: "Updated!" });
    },
  });

  if (authLoading) return null;
  if (!user) return <Navigate to="/auth" />;

  if (roles && !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12 text-center">
          <p className="text-4xl mb-4">🔒</p>
          <h1 className="font-display text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground mt-2">You don't have admin permissions.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="font-display text-3xl font-bold mb-6">Admin Panel</h1>

        <Tabs defaultValue="bookings">
          <TabsList className="mb-6">
            <TabsTrigger value="bookings">Bookings ({bookings?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="pujas">Pujas ({pujas?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="temples">Temples ({temples?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <div className="space-y-3">
              {bookings?.map((b) => (
                <Card key={b.id} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold">{b.booking_number} — {b.pujas?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {b.devotee_name} • {b.booking_date} • ₹{b.payment_amount.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Select value={b.status} onValueChange={(v) => updateBooking.mutate({ id: b.id, updates: { status: v } })}>
                          <SelectTrigger className="w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {["pending","confirmed","scheduled","completed","cancelled"].map(s => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input placeholder="Video link" defaultValue={b.video_link ?? ""} className="w-40" onBlur={(e) => {
                          if (e.target.value !== (b.video_link ?? "")) {
                            updateBooking.mutate({ id: b.id, updates: { video_link: e.target.value || null } });
                          }
                        }} />
                        <Input placeholder="Tracking #" defaultValue={b.tracking_number ?? ""} className="w-36" onBlur={(e) => {
                          if (e.target.value !== (b.tracking_number ?? "")) {
                            updateBooking.mutate({ id: b.id, updates: { tracking_number: e.target.value || null } });
                          }
                        }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {(!bookings || bookings.length === 0) && (
                <p className="text-center text-muted-foreground py-8">No bookings yet.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="pujas">
            <PujaManager temples={temples ?? []} />
          </TabsContent>

          <TabsContent value="temples">
            <TempleManager />
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-display font-bold text-primary">{bookings?.length ?? 0}</p>
                  <p className="text-sm text-muted-foreground mt-1">Total Bookings</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-display font-bold text-primary">
                    ₹{(bookings?.reduce((sum, b) => sum + b.payment_amount, 0) ?? 0).toLocaleString("en-IN")}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Total Revenue</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-display font-bold text-primary">
                    {bookings?.filter(b => b.status === "completed").length ?? 0}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Completed</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}

function PujaManager({ temples }: { temples: any[] }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", deity: "", description: "", temple_id: "", price: "", duration: "", benefits: "", preparation_instructions: "", category: "", image_url: "", is_featured: false });

  const create = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("pujas").insert({
        name: form.name,
        deity: form.deity,
        description: form.description || null,
        temple_id: form.temple_id || null,
        price: parseInt(form.price) || 0,
        duration: form.duration || null,
        benefits: form.benefits || null,
        preparation_instructions: form.preparation_instructions || null,
        category: form.category || null,
        image_url: form.image_url || null,
        is_featured: form.is_featured,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pujas"] });
      toast({ title: "Puja created!" });
      setOpen(false);
      setForm({ name: "", deity: "", description: "", temple_id: "", price: "", duration: "", benefits: "", preparation_instructions: "", category: "", image_url: "", is_featured: false });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="saffron" className="mb-4">+ Add Puja</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-display">Create Puja</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div><Label>Deity *</Label><Input value={form.deity} onChange={e => setForm(f => ({ ...f, deity: e.target.value }))} /></div>
            <div><Label>Temple</Label>
              <Select value={form.temple_id} onValueChange={v => setForm(f => ({ ...f, temple_id: v }))}>
                <SelectTrigger><SelectValue placeholder="Select temple" /></SelectTrigger>
                <SelectContent>{temples.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Price (₹) *</Label><Input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} /></div>
            <div><Label>Duration</Label><Input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="e.g. 2 hours" /></div>
            <div><Label>Category</Label><Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Health, Prosperity" /></div>
            <div><Label>Image URL</Label><Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
            <div><Label>Benefits</Label><Textarea value={form.benefits} onChange={e => setForm(f => ({ ...f, benefits: e.target.value }))} /></div>
            <div><Label>Preparation</Label><Textarea value={form.preparation_instructions} onChange={e => setForm(f => ({ ...f, preparation_instructions: e.target.value }))} /></div>
            <div className="flex items-center gap-2"><Switch checked={form.is_featured} onCheckedChange={v => setForm(f => ({ ...f, is_featured: v }))} /><Label>Featured</Label></div>
            <Button variant="saffron" className="w-full" onClick={() => create.mutate()} disabled={!form.name || !form.deity || create.isPending}>
              {create.isPending ? "Creating..." : "Create Puja"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TempleManager() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", location: "", description: "", image_url: "", contact_person: "", contact_email: "" });

  const create = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("temples").insert({
        name: form.name,
        location: form.location,
        description: form.description || null,
        image_url: form.image_url || null,
        contact_person: form.contact_person || null,
        contact_email: form.contact_email || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-temples"] });
      toast({ title: "Temple created!" });
      setOpen(false);
      setForm({ name: "", location: "", description: "", image_url: "", contact_person: "", contact_email: "" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="saffron" className="mb-4">+ Add Temple</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle className="font-display">Create Temple</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div><Label>Location *</Label><Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
            <div><Label>Image URL</Label><Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} /></div>
            <div><Label>Contact Person</Label><Input value={form.contact_person} onChange={e => setForm(f => ({ ...f, contact_person: e.target.value }))} /></div>
            <div><Label>Contact Email</Label><Input value={form.contact_email} onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))} /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
            <Button variant="saffron" className="w-full" onClick={() => create.mutate()} disabled={!form.name || !form.location || create.isPending}>
              {create.isPending ? "Creating..." : "Create Temple"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
