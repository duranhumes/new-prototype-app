import * as React from 'react';
import { StatusBar } from 'react-native';
import { Box } from 'react-native-design-utility';

import { Listing } from './views/Listing';

class AroundMeListing extends React.Component<{ navigation: any }> {
    static navigationOptions = {
        header: null,
    };

    render() {
        console.log(this.props);
        return (
            <Box f={1} bg="white">
                <StatusBar barStyle="dark-content" />
                <Box f={1} pb="sm">
                    <Listing data={this.props.navigation} />
                </Box>
            </Box>
        );
    }
}

export default AroundMeListing;
