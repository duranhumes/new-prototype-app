import * as React from 'react';
import { StatusBar } from 'react-native';
import { Box } from 'react-native-design-utility';

import { Base } from './views/Base';

class AroundMe extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <Box f={1} bg="white">
                <StatusBar barStyle="dark-content" />
                <Box f={1} pb="sm">
                    <Base />
                </Box>
            </Box>
        );
    }
}

export default AroundMe;
