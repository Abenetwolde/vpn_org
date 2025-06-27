"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { authService } from "@/services/authService"
import { toast } from "sonner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  // Client-side auth check for protected route
  React.useEffect(() => {
    const authToken = authService.getToken()
    const pathname = window.location.pathname

    const protectedPaths = ["/dashboard"]
    const isProtectedPath = protectedPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    )

    if (isProtectedPath && !authToken) {
      toast.error("Unauthorized", {
        description: "Please log in to access the dashboard.",
      })
      router.push("/login")
    }
  }, [router])

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 p-4">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}