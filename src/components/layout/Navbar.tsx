import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggler";
import { Link, NavLink } from "react-router-dom";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import Logo from "@/assets/icons/Logo";
import { role } from "@/constants/role";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" as const },
  { href: "/about", label: "About", role: "PUBLIC" as const },
  { href: "/features", label: "Features", role: "PUBLIC" as const },
  { href: "/faq", label: "Faq", role: "PUBLIC" as const },
  { href: "/contact", label: "Contact", role: "PUBLIC" as const },
  { href: "/admin/analytics", label: "Dashboard", role: role.superAdmin },
  { href: "/admin/analytics", label: "Dashboard", role: role.admin },
  { href: "/admin/analytics", label: "Dashboard", role: role.user },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const userRole = data?.data?.role as string | undefined;

  const linkBase = "block px-2 py-1.5 rounded transition-colors";
  const linkActive = "text-yellow-500 font-semibold";
  const linkInactive = "text-muted-foreground hover:text-primary hover:bg-muted/60";

  // Filter by role and dedupe identical hrefs (in case multiple roles share same dashboard path)
  const visibleLinks = Array.from(
    new Map(
      navigationLinks
        .filter((link) => link.role === "PUBLIC" || (userRole && link.role === userRole))
        .map((l) => [l.href, l]) // key by href
    ).values()
  );

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-gray-300">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="relative md:hidden cursor-pointer"
                variant="ghost"
                size="icon"
              >
                {/* Simple hamburger icon */}
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all"
                >
                  <path d="M4 6H20" />
                  <path d="M4 12H20" />
                  <path d="M4 18H20" />
                </svg>
              </Button>
            </PopoverTrigger>

            {/* Mobile menu */}
            <PopoverContent
              align="start"
              sideOffset={8}
              className="w-48 p-1 md:hidden z-[60]"
            >
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0">
                  {visibleLinks.map((link) => (
                    <NavigationMenuItem key={link.href} className="w-full">
                      {/* Let NavLink own all styling */}
                      <NavigationMenuLink asChild>
                        <NavLink
                          to={link.href}
                          className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : linkInactive}`
                          }
                          end={link.href === "/"} // exact-match for Home
                        >
                          {link.label}
                        </NavLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Logo + Desktop nav */}
          <div className="flex items-center gap-6">
            <Logo />

            {/* Desktop navigation */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {visibleLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    {/* IMPORTANT: no color classes here—NavLink controls active/inactive */}
                    <NavigationMenuLink asChild>
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `${linkBase} ${isActive ? linkActive : linkInactive} py-1.5 font-medium`
                        }
                        end={link.href === "/"} // exact-match for Home
                      >
                        {link.label}
                      </NavLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {data?.data?.email ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-yellow-400 text-white font-bold px-4 py-2 rounded-full text-sm shadow-xl transition"
            >
              Logout
            </Button>
          ) : (
            <Button
              asChild
              className="font-bold px-4 py-2 rounded-full text-sm shadow-xl transition"
            >
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
