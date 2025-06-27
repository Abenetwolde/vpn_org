"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { IconQrcode } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  setData: any;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FileUploader({ setData, setLoading }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [emails, setEmails] = useState<string[]>([]);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const parsedEmails = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line !== "");

      setEmails(parsedEmails);
    };
    reader.readAsText(file);
  };

  const handleGenerateClick = async () => {
    if (emails.length === 0) return;

    const results: any[] = [];
    setLoading(true);

    for (const email of emails) {
      try {
        const response = await axios.post(
          "http://196.189.239.113:5000/generate",
          { name: email },
          {
            headers: {
              Authorization: "Basic " + btoa("admin:your-secure-password"),
              "Content-Type": "application/json",
            },
          }
        );

        const res = response.data;
        const item = {
          email: res?.name || email,
          ip: res?.ip || "N/A",
          qrCodes: res?.config || "N/A",
          public_key: res?.public_key || "N/A",

        };
        results.push(item);
        console.log("Successfully sent", email, ":", item);
      } catch (err) {
        console.error("Failed to send", email, err);
      }
    }

    setData(results);
    console.log("All emails processed:", results);
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className={cn(
          "mx-auto w-3/4 max-w-full border border-dashed border-primary rounded-xl px-4 py-6 flex flex-col sm:flex-row items-center justify-center gap-4 bg-background text-center cursor-pointer hover:bg-muted transition-all"
        )}
        onClick={handleFileClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".txt"
        />
        <div className="flex flex-col items-center gap-2">
          <UploadCloud className="text-primary w-6 h-6" />
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-medium underline">Click here</span> to upload your .txt file.
          </p>
          <p className="text-xs text-muted-foreground">
            Each line should be an email. Max size 10MB.
          </p>
        </div>
      </div>

  

      {emails.length > 0 && (
        <div className="mt-4 w-full max-w-3xl text-sm text-muted-foreground">
          <p className="font-medium text-primary mb-2">Emails Read: {emails.length}</p>
          <ul className="list-disc list-inside space-y-1 max-h-64 overflow-y-auto border rounded-md p-2">
            {emails.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        </div>
      )}
          <Button
        className="mt-6 w-3/4 max-w-full cursor-pointer"
        variant="default"
        size="lg"
        disabled={emails.length === 0}
        onClick={handleGenerateClick}
      >
        <IconQrcode className="mr-2 size-4" />
        <span>Generate QR Code</span>
      </Button>
    </div>
  );
}
