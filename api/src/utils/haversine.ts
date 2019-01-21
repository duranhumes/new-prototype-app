export interface ICoords {
    lat: number;
    lng: number;
}

const RADII = {
    km: 6371,
    mile: 3960,
    meter: 6371000,
    nmi: 3440,
};

const toRad = (num: number) => (num * Math.PI) / 180;

const formatCoords = (coordinates: ICoords) => ({
    latitude: coordinates.lat,
    longitude: coordinates.lng,
});

export function haversine(startCoordinates: ICoords, endCoordinates: ICoords) {
    const R = RADII.mile;

    const start = formatCoords(startCoordinates);
    const end = formatCoords(endCoordinates);

    const dLat = toRad(end.latitude - start.latitude);
    const dLon = toRad(end.longitude - start.longitude);
    const lat1 = toRad(start.latitude);
    const lat2 = toRad(end.latitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}
