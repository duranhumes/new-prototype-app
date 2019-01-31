import * as React from 'react';
import { Icon } from 'expo';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

import { VIEWPORT_WIDTH, resultTypes } from '../constants';
import { IListing } from '../interfaces';
import { theme } from '../../../constants';

interface ICard {
    item: IListing;
    handleNavigation: (...args: any) => void;
    handleCall: (...args: any) => void;
}

function getTagColorFromType(type: string) {
    switch (type) {
        case resultTypes.listing:
            return theme.color.blue;
        case resultTypes.news:
            return theme.color.red;
        case resultTypes.event:
            return theme.color.purple;
        case resultTypes.movie:
            return theme.color.grey;
        default:
            return theme.color.blue;
    }
}

export function Card({ item, handleNavigation, handleCall }: ICard) {
    const { title } = item;

    const firstLocation = {
        phone: item.locations ? item.locations[0].phone : null,
        address: item.locations ? item.locations[0].address : null,
    };

    return (
        <TouchableHighlight
            style={styles.card}
            onPress={() => handleNavigation(item)}>
            <>
                <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardTitle}>
                        {title}
                    </Text>
                    {item.type === resultTypes.listing && (
                        <>
                            <Text
                                numberOfLines={1}
                                style={styles.cardDescription}>
                                {firstLocation.address}
                            </Text>
                            <TouchableHighlight
                                onPress={() => handleCall(firstLocation.phone)}>
                                <Text style={styles.cardDescription}>
                                    <Icon.Ionicons
                                        name="ios-call"
                                        size={26}
                                        style={{ marginBottom: -3 }}
                                    />
                                </Text>
                            </TouchableHighlight>
                        </>
                    )}
                    {item.type === resultTypes.news && (
                        <Text numberOfLines={1} style={styles.cardDescription}>
                            {item.news_text.replace(/<(?:.|\n)*?>/gm, '')}
                        </Text>
                    )}
                </View>
                <View
                    style={[
                        styles.tagContainer,
                        {
                            backgroundColor: getTagColorFromType(item.type),
                        },
                    ]}>
                    <Text style={styles.tag}>{item.type.toUpperCase()}</Text>
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
    },
    tag: {
        color: theme.color.white,
        textShadowColor: theme.color.greyDark,
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontWeight: 'bold',
    },
});
