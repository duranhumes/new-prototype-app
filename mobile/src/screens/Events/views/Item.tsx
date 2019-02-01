import * as React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';

import { VIEWPORT_WIDTH } from '../constants';
import { IItem } from '../interfaces';
import { formatDate } from '../../../utils';

// TODO: Add event image on backend and here
export function Item({ data }: any) {
    const {
        title,
        fullDescription,
        shortDescription,
        startDate,
    }: Partial<IItem> = data.state.params;

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.date}>
                        <Text>{formatDate(String(startDate))}</Text>
                    </View>
                    {/* <Image
                        style={styles.image}
                        source={backgroundImage}
                        resizeMode="cover"
                        blurRadius={2}
                    /> */}
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.textContainer}>
                    <HTML
                        html={shortDescription}
                        ignoredStyles={['letter-spacing', 'line-height']}
                        imagesMaxWidth={VIEWPORT_WIDTH}
                    />
                    <HTML
                        html={fullDescription}
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
