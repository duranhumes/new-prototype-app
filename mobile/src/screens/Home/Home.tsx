import * as React from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { Box, Text } from 'react-native-design-utility';

class Home extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <Box f={1} bg="white">
                <StatusBar barStyle="dark-content" />
                <Box f={1} pb="sm">
                    <ScrollView>
                        <Text>Home</Text>
                    </ScrollView>
                </Box>
            </Box>
        );
    }
}

export default Home;
