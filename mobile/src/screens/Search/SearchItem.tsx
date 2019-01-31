import * as React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

import { Item } from './views/Item';
import { theme } from '../../constants';

export default class SearchItem extends React.Component<{
    navigation: any;
}> {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.child}>
                    <Item data={this.props.navigation} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    child: {
        flex: 1,
        paddingBottom: theme.space.sm,
    },
});
