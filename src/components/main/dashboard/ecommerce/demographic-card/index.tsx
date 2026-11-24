"use client";

import useThemeColors from "@/components/main/security/shared/use-theme-colors";
import CardHeader from "./card-header";
import CountryList from "./country-list";
import CountryMap, { Marker } from "./country-map";
import { demographicData } from "./data";

export default function DemographicCard() {
  const palette = useThemeColors();
  const highlightedRegions = demographicData.map((c) => c.code);
  const mapMarkers: Marker[] = demographicData.map((country) => ({
    latLng: country.latLng,
    name: country.name,
    style: {
      fill: palette["data-primary"],
      borderWidth: 1,
      borderColor: palette.surface,
    },
  }));

  return (
    <div className="em-module">
      <CardHeader />

      <div className="em-map-frame">
        <div id="mapOne" className="mapOne map-btn em-map-canvas">
          <CountryMap
            markers={mapMarkers}
            highlightedRegions={highlightedRegions}
          />
        </div>
      </div>

      <CountryList />
    </div>
  );
}
