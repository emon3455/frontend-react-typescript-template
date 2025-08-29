import { useEffect, useState } from "react";

export default function FadeIn({ children, delay = 60 }: { children: React.ReactNode; delay?: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div className={`transition-opacity duration-700 ${show ? "opacity-100" : "opacity-0"}`}>
      {children}
    </div>
  );
}
