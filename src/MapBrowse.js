import React from "react";
import Map from "./components/Map";
import { Wrapper } from "@googlemaps/react-wrapper";

function MapBrowse(p) {
    return (
        <Wrapper apiKey={process.env.REACT_APP_GOOGLEMAPS_KEY}>
            <Map />
        </Wrapper>
    );
}

export default MapBrowse;