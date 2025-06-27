"use client"
import { AppSidebar } from "@/components/app-sidebar"

import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { FileUploader } from "@/components/file-uploader"
import { ChevronLeft } from "lucide-react"
import MapComponent from "@/components/map-component"
import CompanyCard from "@/components/company-card"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/services/authService"
import { toast } from "sonner"
import { DataTable } from "@/components/data-table/DataTable"
export default function Page() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const router = useRouter()

  // Fetch data from API with Basic Authentication
  useEffect(() => {
    const fetchData = async () => {
      const token = authService.getToken()
      if (!token) {
        toast.error("Unauthorized", {
          description: "Please log in to view VPN users.",
        })
        router.push("/login")
        return
      }

      setLoading(true)
      try {
        // Encode username:password for Basic Auth
        const authHeader = `Basic ${btoa("admin:your-secure-password")}`
        const response = await fetch("http://196.189.239.113:5000/clients", {
          method: "GET",
          headers: {
            "Authorization": authHeader,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Error", {
          description: "Failed to load VPN users. Please try again.",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  // Client-side auth check for protected route
  useEffect(() => {
    const authToken = authService.getToken()
    const pathname = window.location.pathname

    const protectedPaths = ["/dashboard"]
    const isProtectedPath = protectedPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    )

    if (isProtectedPath && !authToken) {
      router.push("/login")
    }
  }, [router])

  return (
 
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="w-full border-b border-muted pb-3 mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <ChevronLeft className="h-5 w-5" />
                VPN Users
              </h2>
            </div>
            <FileUploader setData={setData} setLoading={setLoading} />
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : (
                <DataTable data={data} />
              )}
            </div>
            <div className="flex flex-col lg:flex-row gap-4 p-4">
              <MapComponent selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
              <CompanyCard selectedRegion={selectedRegion} />
            </div>
          </div>
        </div>
     
  )
}