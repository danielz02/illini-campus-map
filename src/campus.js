// @flow

import React, { Component } from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import locations from './assets/campus-locations'


type State = {
    lat: number,
    lng: number,
    zoom: number,
}

type CircleMarkerOption = {
    radius: number,
    fillColor: string,
    color: string,
    weight: number,
    opacity: number,
    fillOpacity: number
}

type PolygonOption = {
    stroke: boolean,
    color: string, // The color of the stroke
    opacity: 1, // The opacity of the stroke
    fill: boolean, // Whether to fill the polygon with color
    fillColor: string,
    fillOpacity: number
}

export default class CampusMap extends Component<{}, State, MarkerOption> {
    constructor(props: Props, context: *): void {
        super(props, context);
        this.determinePolygonStyle = this.determinePolygonStyle.bind(this);
        this.addMarkers = this.addMarkers.bind(this);
        this.addPopUps = this.addPopUps.bind(this);
    }

    state: State = {
        lat: 40.1095876,
        lng: -88.2275806,
        zoom: 15,
    };

    urhMarker: CircleMarkerOption = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    regionMarker: PolygonOption = {
        stroke: true,
        color: "#000000", // The color of the stroke
        opacity: 1, // The opacity of the stroke
        fill: true, // Whether to fill the polygon with color
        fillColor: "#13294b",
        fillOpacity: 0.7
    };

    addMarkers(feature, latLng) {
        console.log("Marker:" + latLng);
        return L.circleMarker(latLng, this.urhMarker);
    }

    determinePolygonStyle(feature) {
        console.log("Polygon: " + feature.properties.type);
        switch (feature.properties.type) {
            case 'Region':
                return this.regionMarker;
            case 'College':
                return {fillColor: "#1f4096"}; // Temporary
            default:
                return {fillColor: "#66ccff"};
        }
    }

    addPopUps(feature, layer) {
        console.log("Adding popups");
        if(feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
        }
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON
                    data={locations}
                    pointToLayer={this.addMarkers}
                    style={this.determinePolygonStyle}
                    onEachFeature={this.addPopUps}
                />
                <Marker position={position}>
                    <Popup>
                        This is Illini Union.
                    </Popup>
                </Marker>
            </Map>
        )
    }

}
