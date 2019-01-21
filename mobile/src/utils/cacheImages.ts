import { Image } from 'react-native';
import { Asset } from 'expo';

/**
 * Cache images for faster load times.
 *
 * @param {array} images
 */
export default function cacheImages(images: string[]) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        }

        return Asset.fromModule(image).downloadAsync();
    });
}
