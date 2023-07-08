import React, { useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';


const Map = () => {
useEffect(() => {
    const CONFIGURATION = {
    "ctaTitle": "Checkout",
    "mapOptions": { "center": { "lat": 37.4221, "lng": -122.0841 }, "fullscreenControl": true, "mapTypeControl": false, "streetViewControl": true, "zoom": 11, "zoomControl": true, "maxZoom": 22, "mapId": "" },
    "mapsApiKey": "YOUR_API_KEY_HERE",
    "capabilities": { "addressAutocompleteControl": false, "mapDisplayControl": true, "ctaControl": true }
    };
    const componentForm = [
    'location',
    'locality',
    'administrative_area_level_1',
    'country',
    'postal_code',
    ];

    const getFormInputElement = (component) => document.getElementById(component + '-input');
    const map = new window.google.maps.Map(document.getElementById("gmp-map"), {
    zoom: CONFIGURATION.mapOptions.zoom,
    center: { lat: 37.4221, lng: -122.0841 },
    mapTypeControl: false,
    fullscreenControl: CONFIGURATION.mapOptions.fullscreenControl,
    zoomControl: CONFIGURATION.mapOptions.zoomControl,
    streetViewControl: CONFIGURATION.mapOptions.streetViewControl
    });
    const marker = new window.google.maps.Marker({ map: map, draggable: false });
    const geocoder = new window.google.maps.Geocoder();

    // Adding event listeners for all input fields in the form
    for (const component of componentForm) {
    getFormInputElement(component).addEventListener('blur', geocodeAddress);
    getFormInputElement(component).addEventListener('keyup', function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
        geocodeAddress();
        }
    });
    }

    function validateForm() {
    let formComplete = true;
    for (const component of componentForm) {
        if (!getFormInputElement(component).value) {
        formComplete = false;
        }
    }
    return formComplete;
    }

    function geocodeAddress() {
    if (validateForm()) {
        let address = '';
        // Get address from form inputs
        for (const component of componentForm) {
        address += getFormInputElement(component).value + ' ';
        }
        geocoder.geocode({ address: address }, function (results, status) {
        if (status === window.google.maps.GeocoderStatus.OK) {
            renderAddress(results[0]);
        }
        });
    }
    }

    function renderAddress(place) {
    map.setCenter(place.geometry.location);
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    }
}, []);

return (
    <div className="card-container">
    <div className="panel">
        <div>
        <img className="sb-title-icon" src="https://fonts.gstatic.com/s/i/googlematerialicons/location_pin/v5/24px.svg" alt="" />
        <span className="sb-title">Address Selection</span>
        </div>
        <input type="text" placeholder="Address" id="location-input" />
        <input type="text" placeholder="Apt, Suite, etc (optional)" />
        <input type="text" placeholder="City" id="locality-input" />
        <div className="half-input-container">
        <input type="text" className="half-input" placeholder="State/Province" id="administrative_area_level_1-input" />
        <input type="text" className="half-input" placeholder="Zip/Postal code" id="postal_code-input" />
        </div>
        <input type="text" placeholder="Country" id="country-input" />
        <button className="button-cta">Checkout</button>
    </div>
    <div className="map" id="gmp-map"></div>
    </div>
);
};

export default Map;
