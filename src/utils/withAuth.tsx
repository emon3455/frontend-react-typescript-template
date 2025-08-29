// withAuth.tsx
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { TRole } from "@/types";
import { ComponentType } from "react";
import { Navigate, useLocation } from "react-router-dom";

type Allowed = TRole | TRole[] | undefined;

export const withAuth = (Component: ComponentType, allowedRoles?: Allowed) => {
  return function AuthWrapper() {
    const { data, isLoading, isFetching, error } = useUserInfoQuery();
    const location = useLocation();

    if (isLoading || isFetching) return null;

    const user = data?.data;
    if (error || !user?._id) {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (allowedRoles) {
      const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
      const userRole = user?.role as TRole | undefined;
      if (!userRole || !allowed.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
      }
    }

    return <Component />;
  };
};
