/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import config from "@/config";
import { cn } from "@/lib/utils";
import { useLazyUserInfoQuery, useLoginMutation } from "@/redux/features/auth/auth.api";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  LogIn,
  Chrome,
} from "lucide-react";
import * as React from "react";
import { role } from "@/constants/role";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "superadmin@yopmail.com",
      password: "12345678",
    },
  });

  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [getMe, { isFetching: isGettingMe }] = useLazyUserInfoQuery();
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const formData = {email: values.email as string, password: values.password as string};
    try {
      // 1) server sets HttpOnly cookies here
      await login(formData).unwrap();
      toast.success("Logged in successfully");

      // 2) immediately confirm session & get role
      const me = await getMe().unwrap(); // { success, data: { _id, role, ... } }
      const user = me?.data;

      if (!user?._id) {
        toast.error("Could not fetch your session. Please try again.");
        return;
      }

      if(user.isVerified === false) {
        toast.error("User is not verified");  
        navigate("/verify", { state: values.email });
        return
      }

      // 3) navigate by role
      if (user.role === role.superAdmin || user.role === role.admin) {
        navigate("/admin/analytics", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      console.error(err);
      const msg = err?.data?.message || "Login failed. Please try again.";
      toast.error(msg);
      if (msg === "User is not verified")
        navigate("/verify", { state: values.email });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-300">
          <ShieldCheck className="h-3.5 w-3.5" />
          Bank‑grade security
        </div>
        <h1 className="text-2xl font-bold tracking-tight mt-1">Welcome back</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Log in to manage your wallet, transfers, and cash‑in/cash‑out.
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email address",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                    </span>
                    <Input
                      placeholder="john@example.com"
                      {...field}
                      value={field.value || ""}
                      className="pl-9 focus-visible:border-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: { value: 8, message: "Min 8 characters" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </span>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                      value={field.value || ""}
                      className="pl-9 pr-10 focus-visible:border-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400"
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-muted-foreground select-none">
              <input type="checkbox" className="h-4 w-4 rounded border-input" />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-xs underline underline-offset-4 hover:opacity-80"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoggingIn || isGettingMe}
            className="w-full bg-yellow-400 text-black hover:bg-yellow-300"
          >
            {isLoggingIn || isGettingMe ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loging in…
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" /> Login
              </>
            )}
          </Button>
        </form>
      </Form>

      {/* Divider */}
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-white/70 dark:bg-white/10 backdrop-blur px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>

      {/* Social */}
      <Button
        onClick={() => window.open(`${config.baseUrl}/auth/google`)}
        type="button"
        variant="outline"
        className="w-full cursor-pointer bg-white/80 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10"
      >
        <Chrome className="mr-2 h-4 w-4" />
        Login with Google
      </Button>

      {/* Switch */}
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}
