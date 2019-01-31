import * as React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    ScrollView,
} from 'react-native';
import HTML from 'react-native-render-html';

import { VIEWPORT_WIDTH, defaultImage } from '../constants';

export function ListingView({ data }: any) {
    const { title, address, image, phone, info } = data;
    const backgroundImage = image ? image : defaultImage;

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.distance}>
                        <Text>distance</Text>
                    </TouchableOpacity>
                    <Image
                        style={styles.image}
                        source={backgroundImage}
                        resizeMode="cover"
                        blurRadius={5}
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subText}>{address}</Text>
                    <Text style={styles.subText}>{phone}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <HTML html={info} imagesMaxWidth={VIEWPORT_WIDTH} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: VIEWPORT_WIDTH,
        height: 200,
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
    },
    distance: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 5,
        backgroundColor: '#f2f2f2',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 100,
    },
    image: {
        width: VIEWPORT_WIDTH,
        height: 200,
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subText: {
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center',
        marginVertical: 15,
    },
    titleContainer: {
        width: VIEWPORT_WIDTH,
        flex: 1,
        paddingVertical: 20,
    },
    infoContainer: {
        paddingHorizontal: 20,
    },
});
