"use client"

import * as React from "react"
import { z } from "zod"
import { AddServerForm } from "@/components/servers/AddServerForm"
import { ServerTable } from "@/components/servers/ServerTable"
import { toast } from "sonner"

export const serverSchema = z.object({
  id: z.number(),
  url: z.string().url({ message: "Invalid URL" }),
})

export type Server = z.infer<typeof serverSchema>

export default function ServersPage() {
  const [servers, setServers] = React.useState<Server[]>([])
  const [loading, setLoading] = React.useState(false)

  // Fetch server list on mount
  React.useEffect(() => {
    const fetchServers = async () => {
      setLoading(true)
      try {
        const authHeader = `Basic ${btoa("admin:your-secure-password")}`
        const response = await fetch("http://196.189.239.113:5000/servers", {
          method: "GET",
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()
        // Assuming API returns [{ id: number, name: string }]
        const parsedServers = result.map((server: { id: number; name: string }) => ({
          id: server.id,
          url: server.name, // Map 'name' to 'url' to match schema
        }))
        setServers(parsedServers)
      } catch (error) {
        console.error("Error fetching servers:", error)
        toast.error("Error", {
          description: "Failed to load servers. Please try again.",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchServers()
  }, [])

  const handleAddServer = async (url: string) => {
    const parsed = serverSchema.safeParse({
      id: servers.length + 1, // Temporary ID for local state; API should assign real ID
      url,
    })

    // if (!parsed.success) {
    //   toast.error("Invalid URL", {
    //     description: "Please enter a valid URL.",
    //   })
    //   return
    // }

    try {
      const authHeader = `Basic ${btoa("admin:your-secure-password")}`
      const response = await fetch(`http://196.189.239.113:5000/server?name=${encodeURIComponent(url)}`, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const newServer = await response.json()
      // Assuming API returns { id: number, name: string }
      setServers((prev) => [
        ...prev,
        {
          id: newServer.id || servers.length + 1, // Fallback to local ID if API doesn't return one
          url: newServer.name,
        },
      ])
      toast.success("Success", {
        description: "Server URL added successfully.",
      })
    } catch (error) {
      console.error("Error adding server:", error)
      toast.error("Error", {
        description: "Failed to add server. Please try again.",
      })
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Manage Server URLs</h1>
      <AddServerForm onAddServer={handleAddServer} />
      {loading ? (
        <div className="text-center mt-4">Loading servers...</div>
      ) : (
        <ServerTable servers={servers} />
      )}
    </>
  )
}