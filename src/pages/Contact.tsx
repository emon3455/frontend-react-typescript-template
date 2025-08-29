import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { name } from "@/constants/name";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate submit
    setOk(true);
    setLoading(false);
  }

  return (
    <main className="min-h-screen ">
      <section className="container mx-auto px-6 py-16 max-w-2xl">
        <h1 className="text-4xl font-bold text-foreground text-center">Get in Touch</h1>
        <p className="mt-3 text-muted-foreground text-center">We’ll reply within 1 business day.</p>

        <Card className="mt-10 bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-xl">
          <CardContent className="p-6">
            {ok ? (
              <div className="text-center">
                <div className="text-lg font-semibold">Message received 🎉</div>
                <p className="text-sm text-muted-foreground mt-2">Our team will contact you soon.</p>
              </div>
            ) : (
              <form className="grid gap-4" onSubmit={onSubmit}>
                <Input required placeholder="Your Name" />
                <Input required type="email" placeholder="Your Email" />
                <Textarea required rows={5} placeholder="How can we help?" />
                <Button disabled={loading} className="bg-yellow-400 text-black hover:bg-yellow-300">
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Support: {name} • Hotline: 162xx
        </div>
      </section>
    </main>
  );
}
