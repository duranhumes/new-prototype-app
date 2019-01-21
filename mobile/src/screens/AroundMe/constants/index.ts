import { Dimensions } from 'react-native';

export const VIEWPORT_WIDTH = Dimensions.get('window').width;
export const VIEWPORT_HEIGHT = Dimensions.get('window').height;

export const CARD_HEIGHT = VIEWPORT_HEIGHT / 8;
export const CARD_WIDTH = CARD_HEIGHT * 2;
export const ASPECT_RATIO = VIEWPORT_WIDTH / VIEWPORT_HEIGHT;
export const LATITUDE_DELTA = 0.005;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export const defaultLatLng = {
    latitude: 25.07644,
    longitude: -77.34012,
};
