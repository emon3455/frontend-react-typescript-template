import Logo from "@/assets/icons/Logo";
import { name } from "@/constants/name";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-6 text-sm text-gray-500 dark:text-gray-400">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        {/* Middle: Links */}
        <nav className="flex gap-6 mt-4 md:mt-0">
          <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-100">Home</Link>
          <Link to="/about" className="hover:text-gray-900 dark:hover:text-gray-100">About</Link>
          <Link to="/features" className="hover:text-gray-900 dark:hover:text-gray-100">Features</Link>
          <Link to="/faq" className="hover:text-gray-900 dark:hover:text-gray-100">Faq</Link>
          <Link to="/contact" className="hover:text-gray-900 dark:hover:text-gray-100">Contact</Link>
        </nav>

        {/* Right: Copyright */}
        <p className="mt-4 md:mt-0 text-xs">&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
