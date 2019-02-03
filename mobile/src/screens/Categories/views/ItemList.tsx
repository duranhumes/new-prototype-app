import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { VIEWPORT_WIDTH } from '../constants';
import { Card } from '../components';
import { makeListingsFromCategoryRequest } from '../functions';
import { NavigationService } from '../../../services/NavigationService';
import { IItem } from '../interfaces';

interface IState {
    isLoading: boolean;
    listings: any[];
    hasMore: boolean;
    currentPage: number;
}

interface IProps {
    categoryId: number;
}

const sortListByTitle = (list: any[]) =>
    list.sort((a, b) => a.title.localeCompare(b.title));

export class ItemList extends React.Component<IProps, IState> {
    state = {
        isLoading: false,
        listings: [],
        hasMore: true,
        currentPage: 1,
    };

    handleNavigation = (data: any) => {
        NavigationService.navigate('Item', data);
    };

    getlistings = async () => {
        if (this.state.isLoading || !this.state.hasMore) return;

        this.setState({ isLoading: true });

        const pagination = {
            page: this.state.currentPage,
            limit: 20,
        };

        const results = await makeListingsFromCategoryRequest(
            this.props.categoryId,
            pagination
        );
        const sortedListItems = sortListByTitle(results);
        this.setState(state => ({
            hasMore: !(sortedListItems.length === 0),
            listings: [...state.listings, ...sortedListItems],
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
            this.getlistings();
        }
    };

    async componentDidMount() {
        await this.getlistings();
    }

    render() {
        console.log({ more: this.state.hasMore });
        return (
            <View style={styles.container}>
                <ScrollView
                    scrollEventThrottle={12}
                    onScroll={this.handleScroll}>
                    {this.state.listings.length > 0 &&
                        this.state.listings.map((listing: IItem, index) => (
                            <Card
                                key={index}
                                data={listing}
                                handleNavigation={this.handleNavigation}
                            />
                        ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: VIEWPORT_WIDTH,
        height: 200,
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
    },
    image: {
        width: VIEWPORT_WIDTH,
        height: 200,
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    date: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 5,
        backgroundColor: '#f2f2f2',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleContainer: {
        width: VIEWPORT_WIDTH,
        flex: 1,
        paddingVertical: 20,
    },
    textContainer: {
        paddingHorizontal: 20,
    },
});
