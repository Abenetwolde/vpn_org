"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { ChevronLeft } from "lucide-react"
import MapComponent from "@/components/map-component"
import CompanyCard from "@/components/company-card"
import { useState } from "react"

export default function Page() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  return (
   
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className=" w-full border-b border-muted pb-3 mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <ChevronLeft className="h-5 w-5" />
                Companies Distribution
              </h2>
            </div>
                      <div className="flex flex-col lg:flex-row gap-4 p-4">
<MapComponent selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
      <CompanyCard selectedRegion={selectedRegion} />
    </div>

          </div>
        </div>

  )
}
