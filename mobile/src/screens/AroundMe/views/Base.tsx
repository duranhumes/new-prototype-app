import * as React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Animated,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Location } from 'expo';
import { Region } from 'react-native-maps';
import RNPhoneCall from 'react-native-phone-call';

import { Spinner } from '../../../components';
import { NavigationService } from '../../../services/NavigationService';
import { SelectForm, Map, CardList } from '../components';
import {
    defaultLatLng,
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
    CARD_WIDTH,
    VIEWPORT_WIDTH,
} from '../constants';
import { makeListingsRequest, makeCategoriesRequest } from '../functions';
import { IMarker } from '../interfaces';

interface IState {
    markers: IMarker[];
    categories: any[];
    region: Region;
    userLocation: {
        coordinates: {
            latitude: number;
            longitude: number;
        };
    };
    selectedCategory: number;
    distance: number;
    category?: number;
    isLoading: boolean;
    position: {
        latitude: number;
        longitude: number;
    };
}

const GEOLOCATION_OPTIONS = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 1000,
};

export class Base extends React.Component<any, IState> {
    index: number;
    animation: Animated.Value;
    regionTimeout: any;
    map: any;

    state = {
        markers: [],
        categories: [],
        region: {
            ...defaultLatLng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
        userLocation: { coordinates: { latitude: 0, longitude: 0 } },
        selectedCategory: 0,
        distance: 1,
        category: undefined,
        isLoading: true,
        position: { latitude: 0, longitude: 0 },
    };

    constructor(props: any) {
        super(props);

        this.index = 0;
        this.animation = new Animated.Value(0);
    }

    animateToListing = () => {
        // Detect when scrolling has stopped then animate and debounce the event listener
        this.animation.addListener(({ value }) => {
            let currentCardIndex = Math.floor(value / CARD_WIDTH + 0.1);
            if (currentCardIndex >= this.state.markers.length) {
                currentCardIndex = this.state.markers.length - 1;
            }

            if (currentCardIndex <= 0) {
                currentCardIndex = 0;
            }

            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== currentCardIndex) {
                    this.index = currentCardIndex;
                    const { latitude, longitude } = this.state.markers[
                        currentCardIndex
                    ];
                    const coordinate = { latitude, longitude };
                    this.map.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: this.state.region.latitudeDelta,
                            longitudeDelta: this.state.region.longitudeDelta,
                        },
                        350
                    );
                }
                clearTimeout(this.regionTimeout);
            }, 15);
        });

        Location.watchPositionAsync(
            GEOLOCATION_OPTIONS,
            this.updateUserLocation
        );
    };

    getListings = async () => {
        const {
            distance,
            category,
            position: { latitude, longitude },
        } = this.state;

        const listings = await makeListingsRequest({
            distance,
            category,
            position: { latitude, longitude },
        });

        if (!listings || listings.length === 0) {
            this.setState({ markers: [], isLoading: false });

            return Alert.alert('Nothing found within those search parameters');
        }

        this.setState({ markers: listings, isLoading: false });
    };

    categoryChange = (value: number) => {
        this.setState(
            {
                selectedCategory: value,
                category: value,
                isLoading: true,
            },
            async () => {
                await this.getListings();
            }
        );
    };

    distanceChange = async (value: number) => {
        this.setState({ distance: value, isLoading: true }, async () => {
            await this.getListings();
        });
    };

    findMe = () => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const { latitude, longitude } = coords;
                const position = {
                    latitude,
                    longitude,
                };
                const region = {
                    ...position,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                };

                this.setState({ position, region }, async () => {
                    await this.getListings();
                });
            },
            error => console.error(error),
            GEOLOCATION_OPTIONS
        );
    };

    updateUserLocation = (location: any) => {
        if (location.coords) {
            const userLocation = {
                coordinates: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
            };

            const region = {
                ...userLocation.coordinates,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            };

            this.setState({
                region,
                userLocation,
            });
        }
    };

    handleCall = (phoneNumber: string) => {
        const pNumber = phoneNumber.replace(/[^0-9]/gi, '').slice(0, 10);
        RNPhoneCall({
            number: String(pNumber),
            prompt: true,
        }).catch(console.error);
    };

    handleNavigation = (data: any) => {
        NavigationService.navigate('Listing', { ...data });
    };

    fetchCategories = async () => {
        const categories = await makeCategoriesRequest();

        this.setState({ categories });
    };

    async componentDidMount() {
        this.findMe();
        this.animateToListing();
        await this.fetchCategories();
    }

    render() {
        const interpolations = this.state.markers.map((_, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                (index + 1) * CARD_WIDTH,
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: 'clamp',
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: 'clamp',
            });

            return { scale, opacity };
        });

        return (
            <View style={styles.container}>
                {this.state.isLoading && (
                    <Spinner
                        visible={this.state.isLoading}
                        animation="fade"
                        size="large"
                    />
                )}
                <SelectForm
                    categories={this.state.categories}
                    selectedCategory={this.state.selectedCategory}
                    categoryChange={this.categoryChange}
                    distance={this.state.distance}
                    distanceChange={this.distanceChange}
                />
                <TouchableOpacity
                    style={styles.mapButton}
                    onPress={this.findMe}>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>
                        Find Me
                    </Text>
                </TouchableOpacity>
                <Map
                    _ref={(map: any) => (this.map = map)}
                    region={this.state.region}
                    markers={this.state.markers}
                    updateUserLocation={this.updateUserLocation}
                    interpolations={interpolations}
                />
                <CardList
                    markers={this.state.markers}
                    animation={this.animation}
                    handleNavigation={this.handleNavigation}
                    handleCall={this.handleCall}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapButton: {
        width: VIEWPORT_WIDTH,
        height: 50,
        backgroundColor: 'rgba(252, 253, 253, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.6,
        elevation: 2,
        zIndex: 12,
    },
});
