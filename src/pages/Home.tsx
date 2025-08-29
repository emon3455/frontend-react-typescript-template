import { Button } from "@/components/ui/button";
import { name } from "@/constants/name";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow text-center px-6 py-16 ">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-foreground">
          Welcome to{" "}
          <span className="text-indigo-600 dark:text-indigo-400">{name}</span>
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          A modern platform built to make your life easier. Fast, reliable, and
          designed for your needs.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            className="px-8 py-4 rounded-full text-lg font-semibold"
            onClick={() => navigate("/about")}
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <div className="text-4xl">⚡</div>
          <h3 className="mt-4 text-xl font-semibold text-foreground">
            Fast & Reliable
          </h3>
          <p className="mt-2 text-muted-foreground">
            Experience blazing fast performance with modern technology.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <div className="text-4xl">🌍</div>
          <h3 className="mt-4 text-xl font-semibold text-foreground">
            Accessible Anywhere
          </h3>
          <p className="mt-2 text-muted-foreground">
            Access your account and data securely from any device, anytime.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <div className="text-4xl">🔒</div>
          <h3 className="mt-4 text-xl font-semibold text-foreground">
            Secure by Design
          </h3>
          <p className="mt-2 text-muted-foreground">
            Built with industry-leading security to protect your information.
          </p>
        </div>
      </section>
    </div>
  );
}
