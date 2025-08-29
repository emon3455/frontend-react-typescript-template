import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  ShieldCheck,
  Users,
  Rocket,
  LineChart,
} from "lucide-react";

/** Stats with icons */
const stats = [
  { k: "10K+", v: "Active Users", sub: "People using our platform daily", icon: Users },
  { k: "500K+", v: "Tasks Completed", sub: "Projects & actions handled seamlessly", icon: Zap },
  { k: "99.9%", v: "System Uptime", sub: "Always available when you need it", icon: ShieldCheck },
] as const;

/** Timeline with icons */
const timeline = [
  {
    year: "2022",
    title: "The Idea",
    desc:
      "We started with a vision: to make technology simple, accessible, and powerful for everyone.",
    icon: Rocket,
  },
  {
    year: "2023",
    title: "Public Launch",
    desc:
      "After months of testing and improvements, our platform went live for the world.",
    icon: Users,
  },
  {
    year: "2024",
    title: "Growing Community",
    desc:
      "Thousands of users joined, shaping the product with feedback and real-world use.",
    icon: LineChart,
  },
  {
    year: "2025",
    title: "Future Forward",
    desc:
      "We continue to innovate, focusing on scalability, security, and next-gen features.",
    icon: ShieldCheck,
  },
] as const;

export default function About() {
  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-6 py-16">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="mb-3" variant="secondary">
            About Us
          </Badge>
          <h1 className="text-4xl font-bold text-foreground">
            Building the Future, Together
          </h1>
          <p className="mt-4 text-muted-foreground">
            Our mission is to create a modern platform that helps people work
            smarter, connect faster, and achieve more — all while staying secure
            and reliable.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card
                key={s.k}
                className="bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-lg"
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/15 dark:bg-indigo-400/15">
                    <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="text-3xl font-extrabold">{s.k}</div>
                  <div className="mt-1 font-medium">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground text-center">
            Our Journey
          </h2>
          <div className="mt-8 relative before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:-translate-x-1/2 before:bg-foreground/10">
            <div className="grid gap-8">
              {timeline.map((t, i) => {
                const Icon = t.icon;
                const leftSide = i % 2 === 0; // alternate
                return (
                  <div
                    key={t.year}
                    className={`grid md:grid-cols-2 gap-6 ${
                      leftSide ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    {/* Card */}
                    <div className={leftSide ? "order-2" : "order-2 md:order-1"}>
                      <Card className="bg-white/70 dark:bg-white/10">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/15 dark:bg-indigo-400/15">
                              <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <span className="font-medium">{t.year}</span>
                          </div>
                          <div className="mt-2 text-lg font-semibold">{t.title}</div>
                          <p className="text-sm text-muted-foreground mt-2">{t.desc}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Spacer to align */}
                    <div className={leftSide ? "order-1" : "order-1 md:order-2"} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
