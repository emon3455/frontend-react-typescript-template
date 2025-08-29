import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Ban,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { GetUserQuery, IsActive, IUser } from "@/types/user.type";
import {
  useApproveRejectUserMutation,
  useGetUsersQuery,
} from "@/redux/features/user/user.api";

const statusColor = (s: IsActive) =>
  s === "ACTIVE"
    ? "bg-green-100 text-green-700"
    : s === "PENDING"
    ? "bg-yellow-100 text-yellow-700"
    : s === "BLOCKED"
    ? "bg-red-100 text-red-700"
    : "bg-gray-100 text-gray-700";

const StatusBadge = ({ value }: { value: IsActive }) => (
  <span
    className={cn(
      "px-2 py-0.5 rounded text-xs font-medium",
      statusColor(value)
    )}
  >
    {value}
  </span>
);

function useDebounced<T>(value: T, delay = 400) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

const ManageUser = () => {
  // query state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [isActive, setIsActive] = useState<IsActive | "ALL">("ALL");
  const [role, setRole] = useState<IsActive | "ALL">("ALL");

  const debouncedSearch = useDebounced(search);

  const queryArgs: GetUserQuery = useMemo(
    () => ({
      page,
      limit,
      searchTerm: debouncedSearch,
      isActive,
      role,
    }),
    [page, limit, debouncedSearch, isActive, role]
  );

  const { data, isLoading, isFetching, refetch } = useGetUsersQuery(queryArgs);
  const [mutateStatus, { isLoading: isActing }] =
    useApproveRejectUserMutation();

  const total = data?.meta?.total ?? 0;
  const totalPages =
    data?.meta?.totalPages ??
    Math.max(1, Math.ceil(total / Math.max(limit, 1)));

  const onApprove = async (u: IUser) => {
    try {
      await mutateStatus({ id: u._id, isActive: "ACTIVE" }).unwrap();
      refetch();
      toast.success(`Unblock ${u.name}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to approve agent");
    }
  };

  const onReject = async (u: IUser) => {
    try {
      await mutateStatus({ id: u._id, isActive: "BLOCKED" }).unwrap();
      refetch();
      toast.success(`Blocked ${u.name}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to reject agent");
    }
  };

  const onResetFilters = () => {
    setPage(1);
    setLimit(10);
    setSearch("");
    setIsActive("ALL");
    setRole("ALL");
  };

  const loading = isLoading || isFetching;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Manage User</h1>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search name, email, phone..."
                  className="pl-8"
                  value={search}
                  onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <select
                className="w-full h-9 border rounded-md px-3 bg-background"
                value={isActive}
                onChange={(e) => {
                    setPage(1);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  setIsActive(e.target.value as any);
                }}
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="ACTIVE">Active</option>
                <option value="BLOCKED">Blocked</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <select
                className="w-full h-9 border rounded-md px-3 bg-background"
                value={role}
                onChange={(e) => {
                    setPage(1);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  setRole(e.target.value as any);
                }}
              >
                <option value="ALL">All Role</option>
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <select
                className="w-full h-9 border rounded-md px-3 bg-background"
                value={limit}
                onChange={(e) => {
                  setPage(1);
                  setLimit(Number(e.target.value));
                }}
              >
                {[10, 20, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}/page
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-1 flex">
              <Button
                variant="ghost"
                className="w-full"
                onClick={onResetFilters}
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border rounded-md">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr className="text-left">
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Email</th>
                  <th className="py-2.5 px-3">Phone</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? // skeleton rows
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={`sk-${i}`} className="border-t">
                        {Array.from({ length: 7 }).map((__, j) => (
                          <td key={`sk-${i}-${j}`} className="py-3 px-3">
                            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : data?.data?.map((u) => (
                      <tr key={u._id} className="border-t">
                        <td className="py-3 px-3">{u.name}</td>
                        <td className="py-3 px-3">{u.email}</td>
                        <td className="py-3 px-3">{u.phone ?? "—"}</td>
                        <td className="py-3 px-3">{u.role ?? "—"}</td>
                        <td className="py-3 px-3">
                          <StatusBadge value={u.isActive} />
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex gap-1 justify-end">
                            {u.isActive === "BLOCKED" && (
                              <Button
                                size="sm"
                                onClick={() => onApprove(u)}
                                disabled={isActing}
                              >
                                <ShieldCheck className="h-4 w-4 mr-1" /> Unblock
                              </Button>
                            )}
                            {u.isActive === "ACTIVE" && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => onReject(u)}
                                disabled={isActing}
                              >
                                <Ban className="h-4 w-4 mr-1" /> Block
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                {!isLoading && (data?.data?.length ?? 0) === 0 && (
                  <tr className="border-t">
                    <td
                      className="py-6 px-3 text-center text-muted-foreground"
                      colSpan={7}
                    >
                      No Users Found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium">
                {Math.min((page - 1) * limit + 1, total)}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(page * limit, total)}
              </span>{" "}
              of <span className="font-medium">{total}</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1 || isFetching}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Prev
              </Button>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages || isFetching}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUser;
