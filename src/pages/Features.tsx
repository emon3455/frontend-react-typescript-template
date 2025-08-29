/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone,
  ShieldCheck,
  Users,
  Rocket,
  LineChart,
  FileText,
} from "lucide-react";

const personal = [
  {
    icon: Smartphone,
    title: "Easy to Use",
    desc: "A clean and intuitive interface that works seamlessly across devices.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    desc: "Your data and activity are always protected with enterprise-grade security.",
  },
  {
    icon: Rocket,
    title: "Fast Performance",
    desc: "Optimized to deliver a smooth, reliable experience anytime, anywhere.",
  },
];

const enterprise = [
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Empower your organization with role-based access and multi-user support.",
  },
  {
    icon: LineChart,
    title: "Analytics & Insights",
    desc: "Track usage, monitor performance, and make data-driven decisions.",
  },
  {
    icon: FileText,
    title: "Comprehensive Reporting",
    desc: "Generate detailed logs and reports for compliance and transparency.",
  },
];

function FeatureGrid({
  items,
}: {
  items: { icon: any; title: string; desc: string }[];
}) {
  return (
    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((f) => (
        <Card
          key={f.title}
          className="bg-white/70 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/15 transition shadow-lg"
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <f.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <div className="font-semibold">{f.title}</div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function Features() {
  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center">
          <Badge variant="secondary">Features</Badge>
          <h1 className="mt-2 text-4xl font-bold text-foreground">
            Built for Everyone
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Whether you’re an individual or an enterprise, our platform helps
            you achieve more with powerful, secure, and easy-to-use tools.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="mt-10">
          <TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="personal">For Individuals</TabsTrigger>
            <TabsTrigger value="enterprise">For Business</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <FeatureGrid items={personal} />
          </TabsContent>

          <TabsContent value="enterprise">
            <FeatureGrid items={enterprise} />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
