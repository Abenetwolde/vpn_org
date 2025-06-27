"use client";

import React from "react";
import demoData from "./demo-data.json";

interface CompanyCardProps {
  selectedRegion: string | null;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ selectedRegion }) => {
  // Filter data based on selected region
  const filteredData = selectedRegion
    ? demoData.filter((item) => item.region === selectedRegion)
    : demoData;

  // Group data by company and count VPN users (assuming all users have VPN)
  const companyStats = filteredData.reduce((acc, item:any) => {
    acc[item.company] = acc[item.company] || { count: 0, joinDate: "", emailDomain: "" };
    acc[item.company].count += 1;
    acc[item.company].joinDate = item.joinDate; // Latest join date as example
    acc[item.company].emailDomain = item.email.split("@")[1]; // Extract domain
    return acc;
  }, {} as Record<string, { count: number; joinDate: string; emailDomain: string }>);

  return (
    <div className="w-full lg:w-1/2 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Company Overview</h2>
      {Object.entries(companyStats).map(([company, stats]) => (
        <div key={company} className="mb-4 p-4 border border-gray-200 rounded">
          <h3 className="text-lg font-semibold">{company}</h3>
          <p><strong>VPN Users:</strong> {stats.count}</p>
          <p><strong>Latest Join Date:</strong> {stats.joinDate}</p>
          <p><strong>Email Domain:</strong> {stats.emailDomain}</p>
          <p><strong>Status:</strong> Active</p> {/* Additional detail */}
        </div>
      ))}
    </div>
  );
};

export default CompanyCard;