/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/Password";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { Mail, User, CheckCircle2, Chrome, Loader2, LogIn, Shield } from "lucide-react";
import { name } from "@/constants/name";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" })
      .max(50),
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z.string().min(8, { message: "Minimum 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Minimum 8 characters" }),
    role: z.enum(["USER", "AGENT"], { message: "Please select a role" }),
    accept: z.literal(true, {
      message: "You must accept Terms & Privacy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "USER",
      accept: true,
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    try {
      await register(userInfo).unwrap();
      toast.success("Account created! Please verify your email.");
      sessionStorage.setItem("epay:pendingEmail", userInfo.email); // ✅ fallback
      navigate(`/verify`, { state: userInfo.email });
    } catch (error: any) {
      const msg = error?.data?.message || "Registration failed. Try again.";
      toast.error(msg);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-300">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Create your {name} account
        </div>
        <h1 className="text-2xl font-bold tracking-tight mt-1">Get started</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to create an account
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <User className="h-4 w-4" />
                    </span>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="pl-9 focus-visible:border-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400"
                    />
                  </div>
                </FormControl>
                <FormDescription className="sr-only">
                  Your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                    </span>
                    <Input
                      type="email"
                      placeholder="john.doe@company.com"
                      {...field}
                      className="pl-9 focus-visible:border-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400"
                    />
                  </div>
                </FormControl>
                <FormDescription className="sr-only">
                  We’ll send a verification email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Password
                    {...field}
                    className="focus-visible:border-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Use at least 8 characters, including a number or symbol.
                </FormDescription>
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Password
                    {...field}
                    className="focus-visible:border-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="focus-visible:border-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400 w-full">
                      <span className="left-3">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                      </span>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">USER</SelectItem>
                      <SelectItem value="AGENT">AGENT</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-xs">
                  Choose <span className="font-medium">USER</span> for standard access or{" "}
                  <span className="font-medium">AGENT</span> for enhanced tools.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms */}
          <FormField
            control={form.control}
            name="accept"
            render={({ field }) => (
              <FormItem className="flex items-start gap-2">
                <FormControl>
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-input"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  I agree to the{" "}
                  <Link to="/terms" className="underline underline-offset-4">
                    Terms
                  </Link>{" "}
                  &{" "}
                  <Link to="/privacy" className="underline underline-offset-4">
                    Privacy Policy
                  </Link>
                  .
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-400 text-black hover:bg-yellow-300 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering…
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" /> Register
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
        type="button"
        variant="outline"
        className="w-full cursor-pointer bg-white/80 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10"
      >
        <Chrome className="mr-2 h-4 w-4" />
        Sign up with Google
      </Button>

      {/* Switch */}
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
