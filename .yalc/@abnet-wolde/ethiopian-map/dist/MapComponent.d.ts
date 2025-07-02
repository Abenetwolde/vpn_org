import { default as React } from 'react';
interface MapRegion {
    id: string;
    name: string;
    points: string;
    path?: string;
}
interface RegionData {
    value?: string | number;
    color?: string;
    label?: string;
    [key: string]: any;
}
interface MapComponentProps {
    selectedRegion: string | null;
    setSelectedRegion: React.Dispatch<React.SetStateAction<string | null>>;
    regions?: MapRegion[];
    regionData?: Record<string, RegionData>;
    defaultFillColor?: string;
    activeFillColor?: string;
    hoverFillColor?: string;
    strokeColor?: string;
    activeStrokeColor?: string;
    strokeWidth?: number;
    activeStrokeWidth?: number;
    hoverOpacity?: number;
    className?: string;
    svgClassName?: string;
    onRegionHover?: (regionId: string | null) => void;
    onRegionClick?: (regionId: string) => void;
    tooltipContent?: (regionId: string, data?: RegionData) => React.ReactNode;
    width?: string | number;
    height?: string | number;
    viewBox?: string;
    enableZoom?: boolean;
    zoomLevel?: number;
    customStyles?: string;
    showRegionLabels?: boolean;
    labelClassName?: string;
    labelPosition?: 'center' | 'centroid';
    showValues?: boolean;
    valueFormatter?: (value: string | number) => string;
}
declare const MapComponent: React.FC<MapComponentProps>;
export default MapComponent;
export type { MapComponentProps, MapRegion, RegionData };
