import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "What is this platform?",
    a: "It’s a modern solution designed to simplify your daily tasks and help you work smarter. Whether you’re an individual or a business, you can access powerful tools, track your progress, and stay connected — all in one place.",
  },
  {
    q: "How secure is it?",
    a: "Security is our top priority. We use encryption, secure authentication, and monitoring systems to ensure your data and activity remain safe at all times.",
  },
  {
    q: "Do I need technical skills to use it?",
    a: "Not at all. The platform is built with simplicity in mind, offering an intuitive interface that works smoothly across web and mobile devices.",
  },
  {
    q: "Can teams use this?",
    a: "Yes. We provide collaboration features such as role-based access, shared dashboards, and team management tools so your organization can work efficiently together.",
  },
  {
    q: "Is there customer support?",
    a: "Absolutely. Our support team is available to help you troubleshoot issues, answer questions, and make sure you get the most out of the platform.",
  },
];

export default function Faq() {
  return (
    <main className="min-h-screen p-10">
      <section className="container mx-auto px-6 py-16 max-w-3xl">
        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground text-center">
          Frequently Asked Questions
        </h1>

        {/* Accordion */}
        <Card className="mt-10 bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-xl">
          <CardContent className="p-2 sm:p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Link */}
        <div className="mt-8 text-center text-sm">
          Didn’t find your answer?{" "}
          <Link to="/contact" className="underline font-medium">
            Contact Support
          </Link>
        </div>
      </section>
    </main>
  );
}
