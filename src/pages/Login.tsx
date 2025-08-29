import { Link } from "react-router-dom";
import Logo from "@/assets/icons/Logo";
import { LoginForm } from "@/components/modules/Authentication/LoginForm";
import { name } from "@/constants/name";

export default function Login() {
  return (
    <div className="min-h-svh grid ">
      {/* Left: Form side */}
      <div className="relative flex flex-col p-6 md:p-10">
        {/* Top logo */}
        <div className="flex justify-center md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <Logo />
          </Link>
        </div>

        {/* Centered card */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-xl border border-white/30 dark:border-white/10 p-6 md:p-8">
              <LoginForm />
            </div>
            {/* Small footnote */}
            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing, you agree to {name} Terms & Privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
