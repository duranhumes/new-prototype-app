export interface IMarker {
    id: number;
    title: string;
    info: string;
    address: string;
    phone: string | number;
    email: string;
    website: string;
    latitude: number;
    longitude: number;
    distance?: number;
}
