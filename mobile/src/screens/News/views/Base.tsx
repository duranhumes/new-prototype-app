import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { NavigationService } from '../../../services/NavigationService';
import { Spinner, SearchBar } from '../../../components';
import { makeNewsRequest } from '../functions';
import { IItem } from '../interfaces';
import { Card } from '../components';

interface IState {
    isLoading: boolean;
    news: IItem[];
    currentPage: number;
}

export class Base extends React.Component<any, IState> {
    searchBar: SearchBar | undefined | null;

    state = {
        isLoading: false,
        news: [],
        hasMore: true,
        currentPage: 1,
    };

    handleNavigation = (data: any) => {
        NavigationService.navigate('Item', data);
    };

    getNews = async () => {
        if (this.state.isLoading || !this.state.hasMore) return;

        this.setState({ isLoading: true });

        const pagination = {
            page: this.state.currentPage,
            limit: 20,
        };

        const newsItems = await makeNewsRequest(pagination);
        this.setState(state => ({
            hasMore:
                [...state.news, ...newsItems].length < pagination.limit * 10,
            news: [...state.news, ...newsItems],
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
            contentSize.height - 100
        );
    };

    handleScroll = ({ nativeEvent }: any) => {
        if (this.isCloseToBottom(nativeEvent) && this.state.hasMore) {
            this.getNews();
        }
    };

    async componentDidMount() {
        await this.getNews();
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
                <View style={styles.news}>
                    <ScrollView
                        scrollEventThrottle={12}
                        onScroll={this.handleScroll}>
                        {this.state.news.length > 0 &&
                            this.state.news.map((n: IItem, index) => (
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
    news: {
        flex: 1,
        flexGrow: 7,
    },
});
