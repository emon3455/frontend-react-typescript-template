import Dashboard from "@/pages/Admin/Dashboard";
import ManageUser from "@/pages/Admin/ManageUser";
import ChangePassword from "@/pages/ChangePassword";
import ProfileSettings from "@/pages/ProfileSettings";
import { ISidebarItem } from "@/types";


export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Dashboard,
      },
      {
        title: "Manage User",
        url: "/admin/manage-user",
        component: ManageUser,
      },
      {
        title: "Change Password",
        url: "/admin/change-password",
        component: ChangePassword,
      },
      {
        title: "Profile Settings",
        url: "/admin/profile",
        component: ProfileSettings,
      },
    ],
  },
];
