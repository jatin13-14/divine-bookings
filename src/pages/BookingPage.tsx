import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Participant {
  name: string;
  gotra: string;
}

export default function BookingPage() {
  const { pujaId } = useParams<{ pujaId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    devotee_name: "",
    gotra: "",
    nakshatra: "",
    sankalp_text: "",
    booking_date: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const [participants, setParticipants] = useState<Participant[]>([]);

  const { data: puja } = useQuery({
    queryKey: ["puja-booking", pujaId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pujas")
        .select("*, temples(*)")
        .eq("id", pujaId!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!pujaId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addParticipant = () => {
    setParticipants([...participants, { name: "", gotra: "" }]);
  };

  const updateParticipant = (index: number, field: keyof Participant, value: string) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (!puja) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("bookings").insert([{
        user_id: user.id,
        puja_id: puja.id,
        booking_date: formData.booking_date,
        devotee_name: formData.devotee_name,
        gotra: formData.gotra || null,
        nakshatra: formData.nakshatra || null,
        sankalp_text: formData.sankalp_text || null,
        participants: participants.length > 0 ? JSON.parse(JSON.stringify(participants)) : null,
        delivery_address: JSON.parse(JSON.stringify({
          line: formData.address_line,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          phone: formData.phone,
        })),
        payment_amount: puja.price,
        status: "pending",
        payment_status: "pending",
      }]);
      if (error) throw error;

      toast({ title: "Booking Confirmed! 🙏", description: "Your puja has been booked. You'll receive a confirmation shortly." });
      navigate("/dashboard");
    } catch (err: any) {
      toast({ title: "Booking Failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!puja) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12"><div className="h-40 rounded-lg bg-muted animate-pulse" /></main>
        <Footer />
      </div>
    );
  }

  const steps = ["Devotee Details", "Participants", "Delivery & Date", "Review"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    i + 1 <= step ? "bg-gradient-saffron text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {i + 1}
                  </div>
                  <span className="hidden sm:inline text-sm text-muted-foreground">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Puja summary bar */}
          <Card className="mb-6 shadow-card">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-display font-semibold">{puja.name}</p>
                <p className="text-sm text-muted-foreground">{puja.deity} • {puja.temples?.name}</p>
              </div>
              <span className="font-display text-xl font-bold text-primary">₹{puja.price.toLocaleString("en-IN")}</span>
            </CardContent>
          </Card>

          {/* Step 1: Devotee Details */}
          {step === 1 && (
            <Card className="shadow-card">
              <CardHeader><CardTitle className="font-display">Devotee Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="devotee_name">Full Name *</Label>
                  <Input id="devotee_name" name="devotee_name" value={formData.devotee_name} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gotra">Gotra</Label>
                    <Input id="gotra" name="gotra" value={formData.gotra} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="nakshatra">Nakshatra</Label>
                    <Input id="nakshatra" name="nakshatra" value={formData.nakshatra} onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="sankalp_text">Sankalp Message</Label>
                  <Textarea id="sankalp_text" name="sankalp_text" value={formData.sankalp_text} onChange={handleChange} placeholder="Your prayer intention..." rows={3} />
                </div>
                <Button variant="saffron" className="w-full" onClick={() => setStep(2)} disabled={!formData.devotee_name}>
                  Continue
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Participants */}
          {step === 2 && (
            <Card className="shadow-card">
              <CardHeader><CardTitle className="font-display">Additional Participants</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Add family members or others to include in the sankalp.</p>
                {participants.map((p, i) => (
                  <div key={i} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Label>Name</Label>
                      <Input value={p.name} onChange={(e) => updateParticipant(i, "name", e.target.value)} />
                    </div>
                    <div className="flex-1">
                      <Label>Gotra</Label>
                      <Input value={p.gotra} onChange={(e) => updateParticipant(i, "gotra", e.target.value)} />
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeParticipant(i)}>✕</Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addParticipant} className="w-full">+ Add Participant</Button>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                  <Button variant="saffron" className="flex-1" onClick={() => setStep(3)}>Continue</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Delivery & Date */}
          {step === 3 && (
            <Card className="shadow-card">
              <CardHeader><CardTitle className="font-display">Delivery Address & Date</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="booking_date">Preferred Date *</Label>
                  <Input id="booking_date" name="booking_date" type="date" value={formData.booking_date} onChange={handleChange} required min={new Date().toISOString().split("T")[0]} />
                </div>
                <div>
                  <Label htmlFor="address_line">Address (for prasad delivery)</Label>
                  <Input id="address_line" name="address_line" value={formData.address_line} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleChange} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                  <Button variant="saffron" className="flex-1" onClick={() => setStep(4)} disabled={!formData.booking_date}>Review Booking</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <Card className="shadow-card">
              <CardHeader><CardTitle className="font-display">Review Your Booking</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-secondary p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Puja</span><span className="font-medium">{puja.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Temple</span><span>{puja.temples?.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{formData.booking_date}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Devotee</span><span>{formData.devotee_name}</span></div>
                  {formData.gotra && <div className="flex justify-between"><span className="text-muted-foreground">Gotra</span><span>{formData.gotra}</span></div>}
                  {formData.nakshatra && <div className="flex justify-between"><span className="text-muted-foreground">Nakshatra</span><span>{formData.nakshatra}</span></div>}
                  {formData.sankalp_text && (
                    <div className="pt-2 border-t border-border">
                      <span className="text-muted-foreground">Sankalp:</span>
                      <p className="mt-1">{formData.sankalp_text}</p>
                    </div>
                  )}
                  {participants.length > 0 && (
                    <div className="pt-2 border-t border-border">
                      <span className="text-muted-foreground">Participants:</span>
                      <ul className="mt-1 list-disc pl-4">
                        {participants.map((p, i) => <li key={i}>{p.name} {p.gotra && `(${p.gotra})`}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-center">
                  <span className="text-sm text-muted-foreground">Total Amount</span>
                  <p className="font-display text-3xl font-bold text-primary">₹{puja.price.toLocaleString("en-IN")}</p>
                  <p className="text-xs text-muted-foreground mt-1">Payment will be collected upon confirmation</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>Back</Button>
                  <Button variant="saffron" className="flex-1" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Booking..." : "Confirm Booking 🙏"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
