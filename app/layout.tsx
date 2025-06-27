"use client";
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";





export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    console.log("Auth Token:", authToken);
    const pathname = window.location.pathname;
console.log("Current Pathname:", pathname);
    // Define protected routes
    const protectedPaths = ["/","/dashboard",];
    const isProtectedPath = protectedPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    );

    // Define public routes
    const isLoginPath = pathname === "/login";

    // Redirect to login if trying to access protected route without token
    if (isProtectedPath && !authToken) {
      router.push("/login");
      console.log("Redirecting to login");
    }

    // Redirect to dashboard if authenticated and trying to access login
    if (isLoginPath && authToken) {
      console.log("Redirecting to dashboard");
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}