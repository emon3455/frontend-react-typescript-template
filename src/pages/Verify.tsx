import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, { message: "Your one-time password must be 6 characters." }),
});

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email] = useState(
    (location.state as string) || sessionStorage.getItem("epay:pendingEmail") || ""
  );

  const [confirmed, setConfirmed] = useState(false);
  const [timer, setTimer] = useState(0); // start at 0; set after sending
  const intervalRef = useRef<number | null>(null);

  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" },
  });

  const startCountdown = (seconds: number) => {
    // clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimer(seconds);
    intervalRef.current = window.setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Missing email for verification.");
      return;
    }
    setSending(true);
    const toastId = toast.loading("Sending OTP…");
    try {
      const res = await sendOtp({ email, purpose : "verify_email" }).unwrap();
      if (res.success) {
        toast.success("OTP sent", { id: toastId });
        setConfirmed(true);
        startCountdown(30); // ⏱️ 30s lockout
      } else {
        toast.error("Failed to send OTP", { id: toastId });
      }
    } catch (err) {
      toast.error("Failed to send OTP", { id: toastId });
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setVerifying(true);
    const toastId = toast.loading("Verifying OTP…");
    try {
      const res = await verifyOtp({ email, code: data.pin, purpose : "verify_email" }).unwrap();
      if (res.success) {
        toast.success("OTP verified", { id: toastId });
        setConfirmed(true);
        navigate("/login");
      } else {
        toast.error("Invalid OTP", { id: toastId });
      }
    } catch (err) {
      toast.error("Verification failed", { id: toastId });
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  // optional: redirect if no email at all
  useEffect(() => {
    // if (!email) navigate("/register");
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="grid place-content-center h-screen">
      {confirmed ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              Please enter the 6‑digit code we sent to <br /> {email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One‑Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup><InputOTPSlot index={0} /></InputOTPGroup>
                          <InputOTPGroup><InputOTPSlot index={1} /></InputOTPGroup>
                          <InputOTPGroup><InputOTPSlot index={2} /></InputOTPGroup>
                          <Dot />
                          <InputOTPGroup><InputOTPSlot index={3} /></InputOTPGroup>
                          <InputOTPGroup><InputOTPSlot index={4} /></InputOTPGroup>
                          <InputOTPGroup><InputOTPSlot index={5} /></InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription className="flex items-center gap-2">
                        <Button
                          onClick={handleSendOtp}
                          type="button"
                          variant="link"
                          disabled={timer > 0 || sending}
                          className={cn(
                            "p-0 m-0 cursor-pointer",
                            timer > 0 && "text-gray-500"
                          )}
                        >
                          {sending ? "Sending…" : "Resend OTP"}
                        </Button>
                        {timer > 0 && <span>({timer}s)</span>}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              form="otp-form"
              type="submit"
              disabled={verifying}
              className="bg-yellow-400 text-black hover:bg-yellow-300 cursor-pointer"
            >
              {verifying ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying…</> : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              We will send you an OTP at <br /> {email || "—"}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleSendOtp}
              disabled={sending}
              className="min-w-[300px] bg-yellow-400 text-black hover:bg-yellow-300 cursor-pointer"
            >
              {sending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</> : "Confirm"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
