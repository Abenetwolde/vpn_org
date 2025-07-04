"use client";
import React, { useState } from 'react';
import {EthiopiaSvgMap } from '@abnet-wolde/ethiopian-map';




export function EthiopinaMapTest() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionClick = (regionId: string) => {
    console.log(`Clicked region: ${regionId}`);
  };

  const tooltipContent = (regionId: string) => `Region: ${regionId.toUpperCase()}`;
const regionData: any= {
  tigray: {
    value: 5,
    color: '#347433',
    label: 'Tigray Region',
    universities: [
      'Mekelle University',
      'Mekelle Institute of Technology',
      'Aksum University',
      'Adigrat University',
      'Raya University'
    ]
  },
  amhara: {
    value: 8,
    color: '#FFC107',
    label: 'Amhara Region',
    universities: [
      'Bahir Dar University',
      'University of Gondar',
      'Debre Markos University',
      'Debre Tabor University',
      'Debre Berhan University',
      'Wollo University',
      'Woldia University',
      'Injibara University'
    ]
  },
  oromiya: {
    value: 12,
    color: '#FF6F3C',
    label: 'Oromia Region',
    universities: [
      'Jimma University',
      'Haramaya University',
      'Adama Science & Technology University',
      'Ambo University',
      'Wollega University',
      'Arsi University',
      'Madda Walabu University',
      'Bule Hora University',
      'Dambi Dollo University',
      'Mattu University',
      'Oda Bultum University',
      'Salale University'
    ]
  },
  somali: {
    value: 2,
    color: '#FF33A1',
    label: 'Somali Region',
    universities: [
      'Jigjiga University',
      'Kebri Dehar University'
    ]
  },
  benishangul: {
    value: 1,
    color: '#E69DB8',
    label: 'Benishangul-Gumuz Region',
    universities: ['Assosa University']
  },
  sidama: {
    value: 2,
    color: '#E9F5BE',
    label: 'Sidama Region',
    universities: [
      'Hawassa University',
      'Dilla University'
    ]
  },
  gambella: {
    value: 1,
    color: '#81E7AF',
    label: 'Gambela Region',
    universities: ['Gambela University']
  },
  harar: {
    value: 0,
    color: '#03A791',
    label: 'Harari Region',
    universities: []
  },
  addis_ababa: {
    value: 6,
    color: '#33FF8C',
    label: 'Addis Ababa',
    universities: [
      'Addis Ababa University',
      'Addis Ababa Science & Technology University',
      'St. Paul’s Hospital Millennium Medical College',
      'Ethiopian Civil Service University',
      'Kotebe Metropolitan University',
      'Ethiopian Institute of Architecture, Building Construction and City Development'
    ]
  },
  dire: {
    value: 1,
    color: '#8C33FF',
    label: 'Dire Dawa',
    universities: ['Dire Dawa University']
  },
  afar: {
    value: 1,
    color: '#FF33A1',
    label: 'Afar Region',
    universities: ['Samara University']
  },
  snnpr: {
    value: 6,
    color: '#FF8C33',
    label: 'SNNP Region',
    universities: [
      'Arba Minch University',
      'Wolaita Sodo University',
      'Wachamo University',
      'Wolkite University',
      'Jinka University',
      'Wachemo University'
    ]
  }
};

  return (
    <div>
      <h1>My Ethiopia Map App</h1>
      <p>Click on a region to select it. Hover over a region to see more details.</p>
      <div className="relative w-full h-80 bg-gray-100">

     
             <EthiopiaSvgMap
             regionData={regionData}
        selectedRegion={selectedRegion||null}
        setSelectedRegion={setSelectedRegion}
        defaultFillColor="#67AE6E"
        activeFillColor="#90C67C"
        hoverFillColor="#90C67C"
        strokeColor="#328E6E"
        // activeStrokeColor="#000000"
        strokeWidth={0.7}
        activeStrokeWidth={1}
        hoverOpacity={0.9}
        onRegionClick={handleRegionClick}
        // defaultLabelStyle={{ fontSize:"10px", fill: '#00000' }}
        // defaultValueStyle={{ fontSize: "10px", fill: '#ffffff' }}
        // tooltipContent={tooltipContent}
        // width="400px"
        // height={"310%"}
        className='flex item-center justify-center w-full h-auto bg-gray-100'
        showValues
        showRegionLabels
tooltipContent={(regionId, data) => (
  <div className="absolute top-2 right-2 z-500 bg-white border border-gray-300 shadow-lg p-3 rounded-md w-64 text-xs leading-snug">
    <div className="font-semibold text-sm mb-1">
      {data?.label || regionId}
    </div>
    {data?.universities?.length > 0 ? (
      <ul className="list-disc list-inside mb-2">
        {data.universities.map((uni: string, index: number) => (
          <li key={index}>{uni}</li>
        ))}
      </ul>
    ) : (
      <div className="mb-2">No universities listed.</div>
    )}
    <div className="text-right text-xs">
      Total: {data?.value || 0}
    </div>
  </div>
)}
        enableZoom={true}
        zoomLevel={1}
        showLegend={true}
      />
      <strong>Selected Region:</strong> {selectedRegion || 'None'}
      </div>
 </div>
  );
};
