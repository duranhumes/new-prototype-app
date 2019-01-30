import * as React from 'react';
import { View, Keyboard, StyleSheet } from 'react-native';

import { Spinner, SearchBar } from '../../../components';

interface IState {
    isLoading: boolean;
}

export class Base extends React.Component<any, IState> {
    searchBar: SearchBar | undefined | null;

    state = {
        isLoading: true,
    };

    componentDidMount() {
        this.setState({ isLoading: false });
    }

    handleInput = (input: string) => {
        console.log(input);
    };

    handleSearch = (data: any) => {
        console.log(data);
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
                <View style={styles.viewStyle}>
                    <SearchBar
                        ref={ref => (this.searchBar = ref)}
                        onBlur={() => console.log}
                        onBack={() => Keyboard.dismiss()}
                        animationDuration={350}
                        backCloseSize={40}
                        data={[]}
                        handleChangeText={this.handleInput}
                        handleSearch={this.handleSearch}
                        allDataOnEmptySearch={true}
                        showOnLoad={true}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewStyle: {
        height: 60,
        // flex: 1,
        backgroundColor: '#fff',
        // shadowColor: '#000',
        // shadowOffset: { width: 2, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 5,
        // elevation: 2,
        position: 'relative',
    },
});
