import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { VIEWPORT_WIDTH, resultTypes } from '../constants';
import { ListingView, NewsView } from '../components';

export class Item extends React.Component<{ data: any }> {
    _scrollView: any;

    componentDidUpdate() {
        this._scrollView.scrollTo(0);
    }

    render() {
        const { type: itemType } = this.props.data.state.params;

        const renderView = () => {
            switch (itemType) {
                case resultTypes.listing:
                    return <ListingView data={this.props.data.state.params} />;
                case resultTypes.news:
                    return <NewsView data={this.props.data.state.params} />;
                default:
                    return null;
            }
        };

        return (
            <View style={styles.container}>
                <ScrollView ref={(ref: any) => (this._scrollView = ref)}>
                    {renderView()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    header: {
        width: VIEWPORT_WIDTH,
        height: 200,
        flex: 1,
        position: 'relative',
    },
    distanceStyle: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 5,
        backgroundColor: '#f2f2f2',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 100,
    },
    imageStyle: {
        width: VIEWPORT_WIDTH,
        height: 300,
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    titleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subTextStyle: {
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center',
        marginVertical: 15,
    },
    titleContainer: {
        width: VIEWPORT_WIDTH,
        flex: 1,
        paddingVertical: 20,
    },
    infoContainerStyle: {
        paddingHorizontal: 20,
    },
});
