"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddServerFormProps {
  onAddServer: (url: string) => void
}

export function AddServerForm({ onAddServer }: AddServerFormProps) {
  const [url, setUrl] = React.useState("")

  const handleSubmit = () => {
    if (url.trim()) {
      onAddServer(url)
      setUrl("")
    }
  }

  return (
    <div className="mb-6">
      <div className="grid gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="server-url" className="text-right">
            Server URL
          </Label>
          <Input
            id="server-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="col-span-3"
            placeholder="https://example.com"
          />
        </div>
        <Button onClick={handleSubmit} disabled={!url.trim()}>
          Add Server
        </Button>
      </div>
    </div>
  )
}