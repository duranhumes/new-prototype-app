import * as React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Button } from 'native-base';

import { VIEWPORT_WIDTH, CARD_WIDTH, CARD_HEIGHT } from '../constants';
import { IMarker } from '../interfaces';

interface ICard {
    item: IMarker;
    handleNavigation: (...args: any) => void;
    handleCall: (...args: any) => void;
}

export function Card({ item, handleNavigation, handleCall }: ICard) {
    const { title, address, phone } = item;
    return (
        <TouchableHighlight
            style={styles.card}
            onPress={() => handleNavigation(item)}>
            <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardTitle}>
                    {title}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                    {address}
                </Text>
                <Button transparent onPress={() => handleCall(phone)}>
                    <Text style={styles.cardDescription}>{phone}</Text>
                </Button>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    endPadding: {
        paddingRight: VIEWPORT_WIDTH - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: 'hidden',
    },
    textContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: 'bold',
    },
    cardDescription: {
        fontSize: 12,
        color: '#444',
    },
});
