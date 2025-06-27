import axios from "axios"
import { z } from "zod"

// Schema for API response validation
const vpnConfigSchema = z.object({
  name: z.string().email(),
  ip: z.string().optional(),
  config: z.string().optional(),
})

export async function generateVpnConfigs(emails: string[], currentDataLength: number) {
  const results: { id: number; name: string; ip: string; config_path: string }[] = []
  const authHeader = `Basic ${btoa("admin:your-secure-password")}`

  for (const email of emails) {
    try {
      const response = await axios.post(
        "http://196.189.239.113:5000/generate",
        { name: email },
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      )

      const parsed = vpnConfigSchema.safeParse(response.data)
      if (!parsed.success) {
        console.error(`Invalid response for ${email}:`, parsed.error)
        continue
      }

      const res = parsed.data
      const item = {
        id: results.length + currentDataLength + 1,
        name: res.name || email,
        ip: res.ip || "N/A",
        config_path: res.config || "N/A",
      }
      results.push(item)
      console.log("Successfully sent", email, ":", item)
    } catch (err) {
      console.error("Failed to send", email, err)
    }
  }

  return results
}