import * as React from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';

import { VIEWPORT_WIDTH, defaultImage } from '../constants';

export function NewsView({ data }: any) {
    const { title, image, date, news_text } = data;
    const backgroundImage = image ? image : defaultImage;

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.date}>
                        <Text>{date}</Text>
                    </View>
                    <Image
                        style={styles.image}
                        source={backgroundImage}
                        resizeMode="cover"
                        blurRadius={5}
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.textContainer}>
                    <HTML
                        html={news_text}
                        ignoredStyles={['letter-spacing', 'line-height']}
                        imagesMaxWidth={VIEWPORT_WIDTH}
                    />
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
    image: {
        width: VIEWPORT_WIDTH,
        height: 200,
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    date: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 5,
        backgroundColor: '#f2f2f2',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleContainer: {
        width: VIEWPORT_WIDTH,
        flex: 1,
        paddingVertical: 20,
    },
    textContainer: {
        paddingHorizontal: 20,
    },
});
