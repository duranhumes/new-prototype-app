import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Spinner } from '../../../components';

interface IState {
    isLoading: boolean;
}

export class Listing extends React.Component<any, IState> {
    state = {
        isLoading: true,
    };

    async componentDidMount() {
        this.setState({ isLoading: false });
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
                <Text>Listing</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
