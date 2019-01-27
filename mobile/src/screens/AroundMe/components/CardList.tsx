import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';

import { Card } from './Card';
import { CARD_WIDTH, VIEWPORT_WIDTH } from '../constants';
import { IMarker } from '../interfaces';

interface ICardList {
    markers: IMarker[];
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
            scrollEventThrottle={15}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            decelerationRate={0}
            directionalLockEnabled={true}
            snapToAlignment="left"
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
            {markers.map(marker => (
                <Card
                    key={marker.id}
                    marker={marker}
                    handleNavigation={handleNavigation}
                    handleCall={handleCall}
                />
            ))}
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
