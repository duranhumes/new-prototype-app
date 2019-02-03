import * as React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

import { ItemList } from './views/ItemList';
import { theme } from '../../constants';

export default class CategoriesItem extends React.Component<{
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
                    <ItemList
                        categoryId={
                            this.props.navigation.state.params.categoryId
                        }
                    />
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
