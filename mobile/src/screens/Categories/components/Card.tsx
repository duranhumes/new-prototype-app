import * as React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

import { VIEWPORT_WIDTH } from '../constants';
import { IItem } from '../interfaces';
import { theme } from '../../../constants';

interface ICard {
    data: IItem;
    handleNavigation: (...args: any) => void;
}

export function Card({ data, handleNavigation }: ICard) {
    return (
        <TouchableHighlight
            key={data.id}
            style={styles.card}
            onPress={() => handleNavigation(data)}>
            <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardTitle}>
                    {data.title}
                </Text>
                {data.address !== undefined && data.address.trim() !== '' && (
                    <Text numberOfLines={1}>{data.address}</Text>
                )}
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: theme.color.white,
        marginVertical: 3,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: -2 },
        height: 50,
        width: VIEWPORT_WIDTH,
        overflow: 'hidden',
        flex: 1,
        flexDirection: 'row',
    },
    textContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: 'bold',
    },
});
