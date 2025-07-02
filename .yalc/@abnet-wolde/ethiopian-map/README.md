Ethiopia Map Component
A customizable React component for rendering an interactive SVG map of Ethiopian regions.
Installation
npm install @your-org/ethiopia-map-component

Usage
import React, { useState } from 'react';
import { MapComponent } from '@your-org/ethiopia-map-component';

const App: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <MapComponent
      selectedRegion={selectedRegion}
      setSelectedRegion={setSelectedRegion}
      defaultFillColor="#00C4B4"
      activeFillColor="#40E0D0"
      hoverFillColor="#40E0D0"
      tooltipContent={(regionId) => `Region: ${regionId}`}
      enableZoom={true}
      zoomLevel={1.2}
    />
  );
};

export default App;

Props



Prop
Type
Default
Description



selectedRegion
string | null
null
Currently selected region ID


setSelectedRegion
React.Dispatch<React.SetStateAction<string | null>>
-
Function to update selected region


regions
MapRegion[]
demoData
Array of region data (id, name, points/path)


defaultFillColor
string
#00C4B4
Default fill color for regions


activeFillColor
string
#40E0D0
Fill color for active region


hoverFillColor
string
#40E0D0
Fill color on hover


strokeColor
string
#808080
Default stroke color


activeStrokeColor
string
#FFFFFF
Stroke color for active region


strokeWidth
number
1
Default stroke width


activeStrokeWidth
number
2
Stroke width for active region


hoverOpacity
number
0.9
Opacity on hover


className
string
flex flex-col lg:flex-row gap-4 p-4
Container class name


svgClassName
string
w-full h-auto
SVG element class name


onRegionHover
(regionId: string | null) => void
-
Callback on region hover


onRegionClick
(regionId: string) => void
-
Callback on region click


tooltipContent
(regionId: string) => React.ReactNode
-
Function to render tooltip content


width
string | number
100%
SVG width


height
string | number
auto
SVG height


viewBox
string
0 0 441.853 328.295
SVG viewBox


enableZoom
boolean
false
Enable zoom functionality


zoomLevel
number
1
Zoom level for the map


customStyles
string
''
Additional CSS styles for the SVG


License
MIT