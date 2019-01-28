import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

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
        <Carousel
            data={markers}
            renderItem={({ item }: any) => (
                <Card
                    item={item}
                    handleNavigation={handleNavigation}
                    handleCall={handleCall}
                />
            )}
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
            sliderWidth={VIEWPORT_WIDTH}
            itemWidth={CARD_WIDTH}
            containerCustomStyle={styles.scrollView}
            activeAnimationType={'spring'}
        />
    );
}

const styles = StyleSheet.create({
    scrollView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
});
