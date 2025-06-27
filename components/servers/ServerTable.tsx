"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


interface ServerTableProps {
  servers: any
}

export function ServerTable({ servers }: ServerTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Server URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {servers?.length > 0 ? (
            servers.map((server:any) => (
              <TableRow key={server.id}>
                <TableCell>{server.id}</TableCell>
                <TableCell>{server.url}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="h-24 text-center">
                No servers added.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}