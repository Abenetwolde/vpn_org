"use client"
import { useRef } from "react"
import { UploadCloud, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export function FileUploader() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log("File selected:", file)
    }
  }

  return (
    <div
      className={cn(
        "  mx-auto w-3/4 max-w-full border border-dashed border-primary rounded-xl px-4 py-6 flex flex-col sm:flex-row items-center justify-center gap-4 bg-background text-center cursor-pointer hover:bg-muted transition-all"
      )}
      onClick={handleFileClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".svg,.jpg,.jpeg,.png,.pdf"
      />

      <div className="flex flex-col items-center gap-2">
        <UploadCloud className="text-primary w-6 h-6" />
        <p className="text-sm text-muted-foreground">
          <span className="text-primary font-medium underline">Click here</span> to upload your file or drag.
        </p>
        <p className="text-xs text-muted-foreground">
          Supported Format: SVG, JPG, PNG (10mb each)
        </p>
      </div>

    </div>
  )
}
