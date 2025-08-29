import Footer from "./Footer";
import Navbar from "./Navbar";
import { IProps } from "@/types";


export default function CommonLayout({ children }: IProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-50 via-white to-indigo-100 dark:from-black dark:via-slate-900 dark:to-black backdrop-blur-xl min-h-screen flex flex-col">
      <Navbar />
      <div className="grow-1">{children}</div>
      <Footer />
    </div>
  );
}
