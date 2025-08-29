/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ShieldCheck, Loader2, Lock, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// RTK Query
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Add an uppercase letter")
      .regex(/[a-z]/, "Add a lowercase letter")
      .regex(/[0-9]/, "Add a digit"),
    confirmPassword: z.string(),
  })
  .refine((vals) => vals.password === vals.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof passwordSchema>;

export default function ResetPassword() {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [done, setDone] = React.useState(false);

  // Parse id & token from query (compatible with react-router w/o useSearchParams)
  const search = React.useMemo(() => new URLSearchParams(window.location.search), []);
  const id = search.get("id") || "";
  const token = search.get("token") || "";

  const form = useForm<FormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!id || !token) {
      toast.error("The reset link is invalid or incomplete.");
      return;
    }
    try {
      await resetPassword({ id, token, password: data.password }).unwrap();
      setDone(true);
      toast.success("Password updated successfully. Please sign in.");
      setTimeout(() => navigate("/login"), 900);
    } catch (err: any) {
      const msg = err?.data?.message || "Reset link is invalid or expired.";
      toast.error(msg);
    }
  };

  // Simple live checklist for password requirements
  const pwd = form.watch("password") ?? "";
  const reqs = [
    { ok: pwd.length >= 8, label: "At least 8 characters" },
    { ok: /[A-Z]/.test(pwd), label: "Uppercase letter" },
    { ok: /[a-z]/.test(pwd), label: "Lowercase letter" },
    { ok: /[0-9]/.test(pwd), label: "Digit" },
  ];

  return (
    <div className="min-h-[100svh] grid place-items-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          {/* Brand */}
          <div className="flex items-center justify-center">
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-8"
              onError={(e) => {
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
            <CardTitle>Reset password</CardTitle>
            <CardDescription>
              Create a new password for your account.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {done ? (
            <div className="space-y-4 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-green-600" />
              <p className="text-sm text-muted-foreground">
                Your password has been updated. Redirecting to sign in…
              </p>
              <Button
                onClick={() => navigate("/login")}
                className="bg-yellow-400 text-black hover:bg-yellow-300"
              >
                Go to login
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* New Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <Lock className="h-4 w-4" />
                          </span>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            className="pl-9 focus-visible:border-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm new password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <Lock className="h-4 w-4" />
                          </span>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            className="pl-9 focus-visible:border-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Live checklist */}
                <ul className="space-y-1 text-xs">
                  {reqs.map((r) => (
                    <li key={r.label} className="flex items-center gap-2">
                      {r.ok ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                      <span className={r.ok ? "text-foreground" : "text-muted-foreground"}>
                        {r.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  type="submit"
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating…
                    </>
                  ) : (
                    "Update password"
                  )}
                </Button>

                <div className="text-center text-xs">
                  <Link to="/login" className="inline-flex items-center underline underline-offset-4">
                    <ArrowLeft className="mr-1 h-3.5 w-3.5" />
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
