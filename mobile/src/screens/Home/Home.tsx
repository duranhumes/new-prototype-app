import * as React from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';

import { theme, images } from '../../constants';

const VIEWPORT_WIDTH = Dimensions.get('window').width;
const VIEWPORT_HEIGHT = Dimensions.get('window').height;

export default class Home extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.child}>
                    <ScrollView
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Image
                            style={styles.image}
                            source={images.bannerLogo}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>BahamasLocal</Text>
                        <Text style={styles.text}>
                            BahamasLocal.com is a user-friendly search engine
                            with exclusive listings on businesses and community
                            organizations in The Bahamas. Plus at
                            BahamasLocal.com you can find local news and
                            weather, what's on and what to do with our
                            interactive home page. It is the most powerful
                            Internet-based resource in and for the Bahamian
                            market.
                        </Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    child: {
        flex: 1,
        width: VIEWPORT_WIDTH,
        height: VIEWPORT_HEIGHT,
        paddingBottom: theme.space.sm,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.space.sm,
    },
    image: {
        width: VIEWPORT_WIDTH,
        height: 300,
        flex: 1,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    text: {
        marginTop: 35,
        lineHeight: 24,
        textAlign: 'center',
        color: theme.color.grey,
        width: VIEWPORT_WIDTH * 0.9,
    },
});
