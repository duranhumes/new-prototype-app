import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { NavigationService } from '../../../services/NavigationService';
import { Spinner } from '../../../components';
import { makeEventsRequest } from '../functions';
import { IItem } from '../interfaces';
import { Card } from '../components';

interface IState {
    isLoading: boolean;
    events: IItem[];
    currentPage: number;
}

export class Base extends React.Component<any, IState> {
    state = {
        isLoading: false,
        events: [],
        hasMore: true,
        currentPage: 1,
    };

    handleNavigation = (data: any) => {
        NavigationService.navigate('Item', data);
    };

    getEvents = async () => {
        if (this.state.isLoading || !this.state.hasMore) return;

        this.setState({ isLoading: true });

        const pagination = {
            page: this.state.currentPage,
            limit: 20,
        };

        const eventsItems = await makeEventsRequest(pagination);
        this.setState(state => ({
            hasMore: !(eventsItems.length === 0),
            events: [...state.events, ...eventsItems],
            currentPage: state.currentPage + 1,
            isLoading: false,
        }));
    };

    isCloseToBottom = ({
        layoutMeasurement,
        contentOffset,
        contentSize,
    }: any) => {
        return (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 50
        );
    };

    handleScroll = ({ nativeEvent }: any) => {
        if (this.isCloseToBottom(nativeEvent) && this.state.hasMore) {
            this.getEvents();
        }
    };

    async componentDidMount() {
        await this.getEvents();
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading && (
                    <Spinner
                        visible={this.state.isLoading}
                        animation="fade"
                        size="large"
                    />
                )}
                <View style={styles.events}>
                    <ScrollView
                        scrollEventThrottle={6}
                        onScroll={this.handleScroll}>
                        {this.state.events.length > 0 &&
                            this.state.events.map((n: IItem, index) => (
                                <Card
                                    key={index}
                                    item={n}
                                    handleNavigation={this.handleNavigation}
                                />
                            ))}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    events: {
        flex: 1,
        flexGrow: 7,
    },
});
