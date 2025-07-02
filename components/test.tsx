"use client";
import React, { useState } from 'react';
import {MapComponent } from '@abnet-wolde/ethiopian-map';




export function EthiopinaMapTest() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionClick = (regionId: string) => {
    console.log(`Clicked region: ${regionId}`);
  };

  const tooltipContent = (regionId: string) => `Region: ${regionId.toUpperCase()}`;
const regionData: Record<any, any> = {
  tigray: { value: 5.2, color: '#347433', label: 'Tigray Region' },
  amhara: { value: 21.1, color: '#FFC107' },
  oromiya: { value: 35.8, color: '#FF6F3C' },
  somali: { value: 6.2, color: '#FF33A1' },
  benishangul: { value: 2.5, color: '#E69DB8' },
  sidama: { value: 4.3, color: '#E9F5BE' },
  gambella: { value: 1.8, color: '#81E7AF' },
  harar: { value: 0.5, color: '#03A791' },
  addis_ababa: { value: 3.2, color: '#33FF8C' },
  dire: { value: 1.0, color: '#8C33FF' },
  afar: { value: 3.0, color: '#FF33A1' },
  somalia: { value: 6.2, color: '#FF5733', label: 'Somali Region' },

  // ... other regions
};
  return (
    <div className="app-container">
      <h1>My Ethiopia Map App</h1>
      <p>Click on a region to select it. Hover over a region to see more details.</p>
      <div className='bg-white  rounded-lg shadow-md p-4 w-full  mx-auto'>
             <MapComponent
             regionData={regionData}
        selectedRegion={selectedRegion||null}
        setSelectedRegion={setSelectedRegion}
        defaultFillColor="#67AE6E"
        activeFillColor="#90C67C"
        hoverFillColor="#90C67C"
        strokeColor="#328E6E"
        activeStrokeColor="#FFFFFF"
        strokeWidth={1}
        activeStrokeWidth={0}
        hoverOpacity={0.9}
        onRegionClick={handleRegionClick}
        // tooltipContent={tooltipContent}
        width="100%"
        height={"100%"}
        showValues={true}
        showRegionLabels
         tooltipContent={(regionId, data) => (
        <div>
          <strong>{data?.label || regionId}</strong>
          <div>Value: {data?.value}</div>
        </div>
      )}
        enableZoom={true}
        zoomLevel={1}
      />
      </div>
 
    </div>
  );
};
