import * as React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

import { Base } from './views/Base';
import { theme } from '../../constants';

export default class Events extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.child}>
                    <Base />
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
