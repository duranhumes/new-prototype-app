import * as React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    ScrollView,
} from 'react-native';
import HTML from 'react-native-render-html';

import { VIEWPORT_WIDTH } from '../constants';

class Listing extends React.Component<{ data: any }> {
    render() {
        const {
            title,
            address,
            image,
            distance,
            phone,
            info,
        } = this.props.data.state.params;

        const {
            container,
            header,
            distanceStyle,
            imageStyle,
            titleStyle,
            titleContainer,
            subTextStyle,
            infoContainerStyle,
        } = styles;

        return (
            <View style={container}>
                <ScrollView>
                    <View style={header}>
                        <TouchableOpacity style={distanceStyle}>
                            <Text>{distance}</Text>
                        </TouchableOpacity>
                        <Image style={imageStyle} source={{ uri: image }} />
                    </View>
                    <View style={titleContainer}>
                        <Text style={titleStyle}>{title}</Text>
                        <Text style={subTextStyle}>{address}</Text>
                        <Text style={subTextStyle}>{phone}</Text>
                    </View>
                    <View style={infoContainerStyle}>
                        <HTML html={info} imagesMaxWidth={VIEWPORT_WIDTH} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    header: {
        width: VIEWPORT_WIDTH,
        height: 300,
        flex: 1,
        position: 'relative',
    },
    distanceStyle: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 5,
        backgroundColor: '#f2f2f2',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 100,
    },
    imageStyle: {
        width: VIEWPORT_WIDTH,
        height: 300,
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    titleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subTextStyle: {
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center',
        marginVertical: 15,
    },
    titleContainer: {
        width: VIEWPORT_WIDTH,
        flex: 1,
        paddingVertical: 20,
    },
    infoContainerStyle: {
        paddingHorizontal: 20,
    },
});

export { Listing };
