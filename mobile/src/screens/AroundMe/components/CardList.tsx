import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';

import { Card } from './Card';
import { CARD_WIDTH, VIEWPORT_WIDTH } from '../constants';

interface ICardList {
    markers: any[];
    animation: Animated.Value;
    handleNavigation: (...args: any) => void;
    handleCall: (...args: any) => void;
}

export function CardList({
    markers,
    animation,
    handleNavigation,
    handleCall,
}: ICardList) {
    return (
        <Animated.ScrollView
            horizontal={true}
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            onScroll={Animated.event(
                [
                    {
                        nativeEvent: {
                            contentOffset: {
                                x: animation,
                            },
                        },
                    },
                ],
                { useNativeDriver: true }
            )}
            style={styles.scrollView}
            contentContainerStyle={styles.endPadding}>
            {markers.map(marker => {
                return (
                    <Card
                        key={marker.id}
                        marker={marker}
                        handleNavigation={handleNavigation}
                        handleCall={handleCall}
                    />
                );
            })}
        </Animated.ScrollView>
    );
}

const styles = StyleSheet.create({
    endPadding: {
        paddingRight: VIEWPORT_WIDTH - CARD_WIDTH,
    },
    scrollView: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
});
