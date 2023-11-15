"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleMarker, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { absenLocationCoordinate } from "@/data/location";

export default function Home() {
    const [absenLocation, setAbsenLocation] = useState(null);
    const [userLocation, setUserLocation] = useState(null); //-7.406523077199722, 109.24753248839191
    const [loading, setLoading] = useState(true);

    const locations = useMemo(() => {
        return {
            absenLocation,
        };
    }, [absenLocation]);

    useEffect(() => {
        let ignore = false;

        try {
            if (!ignore) {
                async function getAbsenLocation() {
                    const data = await absenLocationCoordinate();
                    console.log("coordinate: ", data);
                    setAbsenLocation([data.latitude, data.longitude]);
                }
                getAbsenLocation();
            }
        } catch (error) {
            console.log(error);
        } finally {
            if (!ignore) {
                setLoading(false);
            }
        }

        return () => {
            ignore = true;
        };
    }, []);

    useEffect(() => {
        if ("geolocation" in navigator) {
            const successGetLocation = (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const isReadyToAbsen = locations.absenLocation;

                if (
                    isReadyToAbsen !== null &&
                    latitude === locations?.absenLocation[0] &&
                    longitude === locations?.absenLocation[1]
                ) {
                    alert("Kamu bisa Absen!");
                }
                console.log({
                    "My Latitude ": latitude,
                    "My Longitude ": longitude,
                });
                setUserLocation([latitude, longitude]);
            };

            const error = (err) => {
                console.error(`ERROR(${err.code}): ${err.message}`);
            };

            const options = {
                enableHighAccuracy: true, // high acc
                maximumAge: 0, //no cached loc, realtime result
                // timeout: 5000,
            };

            const watchID = navigator.geolocation.watchPosition(successGetLocation, error, options);

            return () => {
                if (watchID) {
                    navigator.geolocation.clearWatch(watchID);
                }
            };
        } else {
            console.log("Location Not Available");
        }
    }, [locations?.absenLocation]);

    if (loading && !absenLocation) {
        return <h1>loading ...</h1>;
    }

    if (!loading && absenLocation && typeof window !== "undefined") {
        return (
            <MapContainer center={locations.absenLocation} zoom={100} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <CircleMarker center={locations.absenLocation} radius={10}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </CircleMarker>
                {userLocation && (
                    <Marker position={userLocation}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        );
    }
}
