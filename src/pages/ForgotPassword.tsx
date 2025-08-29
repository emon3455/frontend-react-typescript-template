/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ShieldCheck, Mail, Loader2, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// RTK Query
import { useForgotPasswordMutation } from "@/redux/features/auth/auth.api";

export default function ForgotPasswordPage({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const form = useForm({
    defaultValues: { email: "" },
  });

  const [submitted, setSubmitted] = React.useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await forgotPassword({ email: data.email }).unwrap();
      // Enumeration-safe UX: show generic success regardless of backend specifics
      setSubmitted(true);
      toast.success("If that email exists, we’ve sent a reset link (expires in 10 minutes).");
    } catch (err: any) {
      // Keep UX generic to avoid leaking whether the email exists
      setSubmitted(true);
      toast.success("If that email exists, we’ve sent a reset link (expires in 10 minutes).");
    }
  };

  return (
    <div className={cn("min-h-[100svh] grid place-items-center px-4", className)} {...props}>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          {/* Brand */}
          <div className="flex items-center justify-center">
            {/* replace src with your actual logo file/path */}
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-8"
              onError={(e) => {
                // fallback to text if logo missing
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          {/* Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              Bank‑grade security
            </div>
          </div>

          <div className="text-center">
            <CardTitle>Forgot your password?</CardTitle>
            <CardDescription>
              Enter your email and we’ll send a password reset link.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {submitted ? (
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                If an account exists for that email, a reset link has been sent. Please check your inbox
                (and spam). The link expires in <strong>10 minutes</strong>.
              </p>
              <div className="flex items-center justify-center">
                <Link to="/login" className="inline-flex items-center text-xs underline underline-offset-4">
                  <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                  Back to login
                </Link>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email address" },
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
                            placeholder="you@example.com"
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

                <Button
                  type="submit"
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending reset link…
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </Button>

                <div className="text-center text-xs">
                  <Link to="/login" className="underline underline-offset-4">
                    Back to login
                  </Link>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
