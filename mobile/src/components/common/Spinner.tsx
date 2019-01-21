import * as React from 'react';
import { StyleSheet, View, Text, Modal, ActivityIndicator } from 'react-native';

type Animation = 'none' | 'slide' | 'fade';
type Sizes = number | 'small' | 'large';

interface ISpinnerProps {
    visible?: boolean;
    cancelable?: boolean;
    textContent?: string;
    animation?: Animation;
    color?: string;
    size?: Sizes;
    overlayColor?: string;
    textStyle?: object;
}

class Spinner extends React.Component<ISpinnerProps> {
    static defaultProps = {
        visible: false,
        cancelable: false,
        textContent: '',
        animation: 'none',
        color: 'white',
        size: 'large',
        overlayColor: 'rgba(0, 0, 0, 0.25)',
    };

    state = {
        visible: this.props.visible,
        textContent: this.props.textContent,
    };

    close() {
        this.setState({ visible: false });
    }

    componentWillReceiveProps(nextProps: Partial<ISpinnerProps>) {
        const { visible, textContent } = nextProps;
        this.setState({ visible, textContent });
    }

    handleOnRequestClose() {
        if (this.props.cancelable) {
            this.close();
        }
    }

    renderDefaultContent() {
        return (
            <View style={styles.background}>
                <ActivityIndicator
                    color={this.props.color}
                    size={this.props.size}
                    style={{ flex: 1 }}
                />
                <View style={styles.textContainer}>
                    <Text style={[styles.textContent, this.props.textStyle]}>
                        {this.state.textContent}
                    </Text>
                </View>
            </View>
        );
    }

    renderSpinner() {
        const { visible } = this.state;

        if (!visible) return null;

        const spinner = (
            <View
                style={[
                    styles.container,
                    { backgroundColor: this.props.overlayColor },
                ]}
                key={`spinner_${Date.now()}`}>
                {this.props.children
                    ? this.props.children
                    : this.renderDefaultContent()}
            </View>
        );

        return (
            <Modal
                animationType={this.props.animation}
                onRequestClose={() => this.handleOnRequestClose()}
                supportedOrientations={['landscape', 'portrait']}
                transparent
                visible={visible}>
                {spinner}
            </Modal>
        );
    }

    render() {
        return this.renderSpinner();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    background: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    textContent: {
        top: 80,
        height: 50,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export { Spinner };
