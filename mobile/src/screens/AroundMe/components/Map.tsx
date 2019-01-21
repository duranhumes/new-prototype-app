import * as React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Animated,
    TouchableHighlight,
} from 'react-native';
import MapView, { Marker, Callout, Region } from 'react-native-maps';

interface IMap {
    _ref: any;
    region: Region;
    markers: object[];
    updateUserLocation: (...args: any) => void;
    interpolations: object;
}

export function Map({
    _ref,
    region,
    markers,
    updateUserLocation,
    interpolations,
}: IMap) {
    return (
        <MapView
            ref={_ref}
            region={region}
            showsUserLocation={true}
            onRegionChange={updateUserLocation}
            style={styles.container}>
            {markers.map((marker: any, index) => {
                const scaleStyle = {
                    transform: [
                        {
                            scale: interpolations[index].scale,
                        },
                    ],
                };
                const opacityStyle = {
                    opacity: interpolations[index].opacity,
                };
                const { id, latitude, longitude } = marker;

                return (
                    <Marker
                        key={id}
                        coordinate={{
                            latitude,
                            longitude,
                        }}>
                        <Animated.View
                            style={[styles.markerWrap, opacityStyle]}>
                            <Animated.View style={[styles.ring, scaleStyle]} />
                            <View style={styles.markerIcon} />
                        </Animated.View>
                        <Callout>
                            <TouchableHighlight
                                onPress={console.log}
                                underlayColor="#dddddd">
                                <View style={styles.calloutText}>
                                    <Text numberOfLines={1}>
                                        {marker.title}
                                    </Text>
                                    <Text numberOfLines={1}>
                                        {marker.address}
                                    </Text>
                                    <Text numberOfLines={1}>
                                        {marker.phone}
                                    </Text>
                                    <Text numberOfLines={1}>
                                        {marker.distance.toFixed(2)} miles away
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </Callout>
                    </Marker>
                );
            })}
        </MapView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    markerWrap: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerIcon: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(130,4,150, 0.9)',
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(130,4,150, 0.3)',
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'rgba(130,4,150, 0.5)',
    },
    calloutText: {
        width: 200,
        height: 'auto',
        flex: 1,
        paddingRight: 5,
        paddingLeft: 5,
    },
});
