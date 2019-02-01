import * as React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

import { VIEWPORT_WIDTH } from '../constants';
import { IItem } from '../interfaces';
import { theme } from '../../../constants';
import { formatDate } from '../functions';

interface ICard {
    item: IItem;
    handleNavigation: (...args: any) => void;
}

export function Card({ item, handleNavigation }: ICard) {
    const { title, text, heading, date } = item;

    return (
        <TouchableHighlight
            style={styles.card}
            onPress={() => handleNavigation(item)}>
            <>
                <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardTitle}>
                        {title}
                    </Text>
                    <Text numberOfLines={1} style={styles.cardDescription}>
                        {heading.length > 0
                            ? heading.replace(/<(?:.|\n)*?>/gm, '')
                            : text.replace(/<(?:.|\n)*?>/gm, '')}
                    </Text>
                </View>
                <View style={styles.tagContainer}>
                    <Text style={styles.tag}>{formatDate(date)}</Text>
                </View>
            </>
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
        height: 80,
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
    cardDescription: {
        fontSize: 12,
        color: '#444',
    },
    tagContainer: {
        height: 30,
        zIndex: 5,
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 100,
        backgroundColor: theme.color.grey,
    },
    tag: {
        color: theme.color.black,
        textShadowColor: theme.color.greyDark,
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontWeight: 'bold',
    },
});
