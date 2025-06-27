"use client"

import * as React from "react"
import { IconX } from "@tabler/icons-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"

interface AddEmailsModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  onSubmit: (emails: string[]) => void
}

export function AddEmailsModal({ isOpen, setIsOpen, onSubmit }: AddEmailsModalProps) {
  const [emails, setEmails] = React.useState<string[]>([])
  const [newEmail, setNewEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleAddEmail = () => {
    if (newEmail && z.string().email().safeParse(newEmail).success) {
      setEmails((prev) => [...prev, newEmail])
      setNewEmail("")
    } else {
      alert("Please enter a valid email address")
    }
  }

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails((prev) => prev.filter((email) => email !== emailToRemove))
  }

  const handleSubmit = async () => {
    setLoading(true)
    await onSubmit(emails)
    setEmails([])
    setLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Emails Manually</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="col-span-3"
              placeholder="Enter email address"
            />
          </div>
          <Button onClick={handleAddEmail} disabled={!newEmail}>
            Add Email
          </Button>
          <div className="flex flex-wrap gap-2">
            {emails.map((email) => (
              <div
                key={email}
                className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-sm"
              >
                {email}
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-5"
                  onClick={() => handleRemoveEmail(email)}
                >
                  <IconX className="size-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={emails.length === 0 || loading}
          >
            {loading ? "Submitting..." : "Submit Emails"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}