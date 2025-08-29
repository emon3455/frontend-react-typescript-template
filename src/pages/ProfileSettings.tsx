/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useUpdateMeMutation } from "@/redux/features/user/user.api";
import type { IUser } from "@/types/user.type";

/** tiny skeleton */
const Skel: React.FC<{ w?: number | string; h?: number | string }> = ({ w = 160, h = 16 }) => (
  <div className="bg-muted animate-pulse rounded" style={{ width: w, height: h }} />
);

const ProfileSettings: React.FC = () => {
  const { data: me, isLoading, isFetching, refetch } = useUserInfoQuery(undefined);
  const [updateMe, { isLoading: saving }] = useUpdateMeMutation();

  const user = me?.data as IUser | undefined;
  const loading = isLoading || isFetching;

  // edit toggles
  const [editing, setEditing] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

  // form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    picture: "",
    address: "",
  });

  // hydrate form when user info loads
  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        picture: (user as any).picture || "",
        address: (user as any).address || "",
        password: "",
      }));
    }
  }, [user]);

  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setForm((f) => ({ ...f, [key]: v }));
    };

  // diff: send only changed keys (and password if set & confirmed)
  const dirty = useMemo(() => {
    if (!user) return {};
    const out: Record<string, any> = {};
    if (form.name !== (user.name || "")) out.name = form.name;
    if (form.email !== (user.email || "")) out.email = form.email;
    if (form.phone !== (user.phone || "")) out.phone = form.phone;
    if (form.picture !== ((user as any).picture || "")) out.picture = form.picture;
    if (form.address !== ((user as any).address || "")) out.address = form.address;
    return out;
  }, [user, form]);

  const hasChanges = Object.keys(dirty).length > 0;

  const cancel = () => {
    if (!user) return;
    setEditing(false);
    // setShowPassword(false);
    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      picture: (user as any).picture || "",
      address: (user as any).address || "",
    });
  };

  const save = async () => {
    if (!hasChanges) {
      toast.info("Nothing to update");
      setEditing(false);
    //   setShowPassword(false);
      return;
    }
    // basic validations
    if (dirty.email && !/^\S+@\S+\.\S+$/.test(dirty.email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      await updateMe(dirty).unwrap();
      toast.success("Profile updated");
      setEditing(false);
    //   setShowPassword(false);
      await refetch();
    } catch (e: any) {
      toast.error(e?.data?.message || "Update failed");
    }
  };

  return (
    <div className="mx-auto min-w-2xl px-4 py-6">
      <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-black dark:text-white drop-shadow">My Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic info */}
          <section className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <Label className="text-xs">Name</Label>
                {loading || !user ? (
                  <div className="mt-2"><Skel w={220} /></div>
                ) : editing ? (
                  <Input className="mt-2" value={form.name} onChange={onChange("name")} placeholder="Your name" />
                ) : (
                  <div className="mt-2 text-sm">{user.name || "—"}</div>
                )}
              </div>

              {/* Email */}
              <div>
                <Label className="text-xs">Email</Label>
                {loading || !user ? (
                  <div className="mt-2"><Skel w={260} /></div>
                ) : editing ? (
                  <Input className="mt-2" value={form.email} onChange={onChange("email")} placeholder="you@example.com" />
                ) : (
                  <div className="mt-2 text-sm">{user.email || "—"}</div>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label className="text-xs">Phone</Label>
                {loading || !user ? (
                  <div className="mt-2"><Skel w={200} /></div>
                ) : editing ? (
                  <Input className="mt-2" value={form.phone} onChange={onChange("phone")} placeholder="+880..." />
                ) : (
                  <div className="mt-2 text-sm">{user.phone || "—"}</div>
                )}
              </div>

              {/* Picture (URL) */}
              <div>
                <Label className="text-xs">Picture URL</Label>
                {loading || !user ? (
                  <div className="mt-2"><Skel w={280} /></div>
                ) : editing ? (
                  <Input className="mt-2" value={form.picture} onChange={onChange("picture")} placeholder="https://…" />
                ) : (
                  <div className="mt-2 text-sm break-all">{(user as any).picture || "—"}</div>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <Label className="text-xs">Address</Label>
                {loading || !user ? (
                  <div className="mt-2"><Skel w={"100%"} /></div>
                ) : editing ? (
                  <Input className="mt-2" value={form.address} onChange={onChange("address")} placeholder="Street, city, country" />
                ) : (
                  <div className="mt-2 text-sm">{(user as any).address || "—"}</div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {!editing ? (
                <Button size="sm" className="rounded-xl" onClick={() => setEditing(true)} disabled={loading}>
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button size="sm" className="rounded-xl" onClick={save} disabled={saving || !hasChanges}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl" onClick={cancel} disabled={saving}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </section>

          {/* <Separator /> */}

          {/* Change password (optional) */}
          {/* <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={showPassword ? "default" : "outline"}
                className="rounded-xl"
                onClick={() => setShowPassword((s) => !s)}
                disabled={loading}
              >
                {showPassword ? "Hide Password Fields" : "Change Password"}
              </Button>
            </div>

            {showPassword && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">New Password</Label>
                  <Input
                    type="password"
                    className="mt-2"
                    value={form.password}
                    onChange={onChange("password")}
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <Label className="text-xs">Confirm New Password</Label>
                  <Input
                    type="password"
                    className="mt-2"
                    value={form.confirmPassword}
                    onChange={onChange("confirmPassword")}
                    placeholder="••••••••"
                  />
                </div>
                {editing && (
                  <div className="md:col-span-2">
                    <Button
                      size="sm"
                      className="rounded-xl"
                      onClick={save}
                      disabled={saving || (!form.password && !hasChanges)}
                    >
                      {saving ? "Saving..." : "Save Password"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </section> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
