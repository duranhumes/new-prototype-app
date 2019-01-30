import * as React from 'react';
import { View, Text, StatusBar, ScrollView, StyleSheet } from 'react-native';

import { theme } from '../../constants';

export default class Home extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.child}>
                    <ScrollView>
                        <Text>Home</Text>
                    </ScrollView>
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
