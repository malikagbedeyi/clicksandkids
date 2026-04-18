"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        document.cookie = "admin_access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/admin/login");
        alert("Session expired due to inactivity.");
      }, 30 * 60 * 1000); 
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      clearTimeout(timeout);
    };
  }, [router]);

  return <>{children}</>;
}