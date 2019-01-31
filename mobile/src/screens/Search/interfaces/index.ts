interface Locations {
    id: number;
    address: string;
    phone: string | number;
    island: string;
    closed_permanently: number;
    closed_temporarily: number;
    longitude: number;
    latitude: number;
    zoomlevel: number;
}

export interface IListing {
    id: number;
    title: string;
    info: string;
    type: string;
    news_text: string;
    locations: Locations[];
}
