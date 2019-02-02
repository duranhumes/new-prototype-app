import * as React from 'react';
import { View, Keyboard, StyleSheet, ScrollView } from 'react-native';
import RNPhoneCall from 'react-native-phone-call';

import { NavigationService } from '../../../services/NavigationService';
import { Spinner, SearchBar } from '../../../components';
import { makeSearchRequest } from '../functions';
import { IItem } from '../interfaces';
import { Card } from '../components';

interface IState {
    isLoading: boolean;
    listings: IItem[];
    query: string;
}

export class Base extends React.Component<any, IState> {
    _scrollView: any;

    state = {
        isLoading: true,
        listings: [],
        query: '',
    };

    componentDidMount() {
        this.setState({ isLoading: false });
    }

    handleInput = (input: string) => {
        this.setState({ query: input });
    };

    handleSearch = async () => {
        const minimumCharaters = 2;
        const { query } = this.state;

        if (query.length > minimumCharaters) {
            this.setState({ isLoading: true });

            this._scrollView.scrollTo({ x: 0, y: 0, animated: true });

            const results = await makeSearchRequest(query);

            this.setState({ isLoading: false, listings: results });
            Keyboard.dismiss();
        } else {
            this.setState({ listings: [] });
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
        NavigationService.navigate('Item', { ...data });
    };

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
                <View style={styles.searchBar}>
                    <SearchBar
                        handleChangeText={this.handleInput}
                        onSubmitEditing={this.handleSearch}
                        showOnLoad={true}
                        hideBack={true}
                    />
                </View>
                <View style={styles.listings}>
                    <ScrollView ref={(ref: any) => (this._scrollView = ref)}>
                        {this.state.listings.length > 0 &&
                            this.state.listings.map((listing: IItem, index) => (
                                <Card
                                    key={index}
                                    item={listing}
                                    handleNavigation={this.handleNavigation}
                                    handleCall={this.handleCall}
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
    searchBar: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#fff',
        position: 'relative',
        marginBottom: 15,
    },
    listings: {
        flex: 1,
        flexGrow: 7,
    },
});
