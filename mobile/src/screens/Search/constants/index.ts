import { Dimensions } from 'react-native';

import { images } from '../../../constants';

export const VIEWPORT_WIDTH = Dimensions.get('window').width;
export const VIEWPORT_HEIGHT = Dimensions.get('window').height;
export const defaultImage = images.bannerLogo;
export const resultTypes = {
    listing: 'listings',
    news: 'news',
    event: 'events',
    movie: 'movies',
};
