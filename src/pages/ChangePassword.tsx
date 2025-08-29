/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";

const ChangePassword: React.FC = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = () => {
    if (!oldPassword) return "Please enter your current password.";
    if (!newPassword) return "Please enter a new password.";
    if (newPassword.length < 8) return "New password must be at least 8 characters.";
    if (newPassword === oldPassword) return "New password must be different from the old password.";
    if (newPassword !== confirm) return "New password and confirmation do not match.";
    return null;
  };

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    try {
      await changePassword({ oldPassword, newPassword }).unwrap();
      toast.success("Password changed successfully.");
      setOldPassword("");
      setNewPassword("");
      setConfirm("");
      setShowOld(false);
      setShowNew(false);
      setShowConfirm(false);
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to change password.");
    }
  };

  return (
    <div className="mx-auto min-w-xl px-4 py-6">
      <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-black dark:text-white drop-shadow">Change Password</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Old password */}
            <div>
              <Label className="text-xs">Current password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showOld ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="h-11 pl-9 pr-10 rounded-xl"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
                  onClick={() => setShowOld((s) => !s)}
                  aria-label="Toggle current password visibility"
                >
                  {showOld ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* New password */}
            <div>
              <Label className="text-xs">New password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-11 pl-9 pr-10 rounded-xl"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
                  onClick={() => setShowNew((s) => !s)}
                  aria-label="Toggle new password visibility"
                >
                  {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <Label className="text-xs">Confirm new password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="h-11 pl-9 pr-10 rounded-xl"
                  placeholder="Re-enter new password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
                  onClick={() => setShowConfirm((s) => !s)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-2">
              <Button type="submit" className="rounded-xl" disabled={isLoading}>
                {isLoading ? "Changing..." : "Change Password"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => {
                  setOldPassword("");
                  setNewPassword("");
                  setConfirm("");
                }}
                disabled={isLoading}
              >
                Clear
              </Button>
            </div>
          </form>

          {/* Optional: lightweight helper text */}
          <div className="text-xs text-muted-foreground">
            Tip: use a strong password (8+ chars, mix of letters, numbers, and symbols).
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
