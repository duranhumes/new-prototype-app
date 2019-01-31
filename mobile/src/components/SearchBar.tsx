import * as React from 'react';
import {
    StyleSheet,
    Dimensions,
    Platform,
    View,
    TextInput,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { Icon } from 'expo';

const INITIAL_TOP = Platform.OS === 'ios' ? -80 : -60;

interface IProps {
    data: any[];
    placeholder: string;
    handleChangeText?: (...args: any) => any;
    handleSearch?: (...args: any) => any;
    onSubmitEditing?: (...args: any) => any;
    onFocus?: (...args: any) => any;
    onBlur?: (...args: any) => any;
    onHide?: (...args: any) => any;
    onBack?: (...args: any) => any;
    onX?: (...args: any) => any;
    backButton?: object;
    backButtonAccessibilityLabel?: string;
    closeButton?: object;
    closeButtonAccessibilityLabel?: string;
    backCloseSize?: number;
    fontSize?: number;
    heightAdjust: number;
    backgroundColor?: string;
    iconColor?: string;
    textColor?: string;
    selectionColor?: string;
    placeholderTextColor?: string;
    animate?: boolean;
    animationDuration?: number;
    showOnLoad?: boolean;
    hideBack?: boolean;
    hideX?: boolean;
    iOSPadding?: boolean;
    iOSHideShadow?: boolean;
    clearOnShow?: boolean;
    clearOnHide?: boolean;
    clearOnBlur?: boolean;
    focusOnLayout?: boolean;
    autoCorrect?: boolean;
    autoCapitalize?: 'sentences' | 'none' | 'words' | 'characters' | undefined;
    keyboardAppearance?: 'default' | 'light' | 'dark' | undefined;
    keyboardType?:
        | 'default'
        | 'email-address'
        | 'numeric'
        | 'phone-pad'
        | 'visible-password'
        | 'ascii-capable'
        | 'numbers-and-punctuation'
        | 'url'
        | 'number-pad'
        | 'name-phone-pad'
        | 'decimal-pad'
        | 'twitter'
        | 'web-search'
        | undefined;
    fontFamily?: string;
    allDataOnEmptySearch?: boolean;
    editable?: boolean;
}

interface IState {
    input: string;
    show: boolean;
}

export class SearchBar extends React.Component<IProps, IState> {
    static defaultProps = {
        data: [],
        placeholder: 'Search',
        backButtonAccessibilityLabel: 'Navigate up',
        closeButtonAccessibilityLabel: 'Clear search text',
        heightAdjust: 0,
        backgroundColor: 'white',
        iconColor: '#1f2123',
        textColor: '#1f2123',
        selectionColor: '#007AFF',
        placeholderTextColor: 'lightgray',
        animate: true,
        animationDuration: 200,
        showOnLoad: false,
        hideBack: false,
        hideX: false,
        iOSPadding: true,
        iOSHideShadow: false,
        clearOnShow: false,
        clearOnHide: true,
        clearOnBlur: false,
        focusOnLayout: true,
        autoCorrect: true,
        autoCapitalize: 'sentences',
        keyboardAppearance: 'default',
        // fontFamily: 'lato',
        allDataOnEmptySearch: false,
        backCloseSize: 28,
        fontSize: 20,
        editable: true,
    };

    top: Animated.Value;
    textInput: any;

    constructor(props: IProps) {
        super(props);

        this.state = {
            input: '',
            show: Boolean(props.showOnLoad),
        };

        this.top = new Animated.Value(
            props.showOnLoad ? 0 : INITIAL_TOP + props.heightAdjust
        );
    }

    getValue = () => {
        return this.state.input;
    };

    show = () => {
        const { animate, animationDuration, clearOnShow } = this.props;
        if (clearOnShow) {
            this.setState({ input: '' });
        }
        this.setState({ show: true });
        if (animate) {
            Animated.timing(this.top, {
                toValue: 0,
                duration: animationDuration,
            }).start();
        } else {
            this.top = new Animated.Value(0);
        }
    };

    hide = () => {
        const { onHide, animate, animationDuration } = this.props;
        if (onHide) {
            onHide(this.state.input);
        }
        if (animate) {
            Animated.timing(this.top, {
                toValue: INITIAL_TOP,
                duration: animationDuration,
            }).start();

            const timerId = setTimeout(() => {
                this._doHide();
                clearTimeout(timerId);
            }, animationDuration);
        } else {
            this.top = new Animated.Value(INITIAL_TOP);
            this._doHide();
        }
    };

    _doHide = () => {
        const { clearOnHide } = this.props;
        this.setState({ show: false });
        if (clearOnHide) {
            this.setState({ input: '' });
        }
    };

    _handleX = () => {
        const { onX } = this.props;
        this._clearInput();

        if (onX) onX();
    };

    _handleBlur = () => {
        const { onBlur, clearOnBlur } = this.props;
        if (onBlur) {
            onBlur();
        }

        if (clearOnBlur) {
            this._clearInput();
        }
    };

    _clearInput = () => {
        this.setState({ input: '' });
        this._onChangeText('');
    };

    _onChangeText = (input: string) => {
        const { handleChangeText, handleSearch } = this.props;

        this.setState({ input });
        if (handleChangeText) {
            handleChangeText(input);
        }
        if (handleSearch) {
            handleSearch(input);
        }
    };

    render = () => {
        const {
            placeholder,
            heightAdjust,
            backgroundColor,
            iconColor,
            textColor,
            selectionColor,
            placeholderTextColor,
            onBack,
            hideBack,
            hideX,
            iOSPadding,
            iOSHideShadow,
            onSubmitEditing,
            onFocus,
            focusOnLayout,
            autoCorrect,
            autoCapitalize,
            keyboardAppearance,
            fontFamily,
            backButton,
            backButtonAccessibilityLabel,
            closeButton,
            closeButtonAccessibilityLabel,
            backCloseSize,
            fontSize,
            editable,
            keyboardType,
        } = this.props;

        return (
            <Animated.View
                style={[
                    styles.container,
                    {
                        top: this.top,
                        shadowOpacity: iOSHideShadow ? 0 : 0.7,
                    },
                ]}>
                {this.state.show && (
                    <View style={[styles.navWrapper, { backgroundColor }]}>
                        {Platform.OS === 'ios' && iOSPadding && (
                            <View style={{ height: 20 }} />
                        )}
                        <View
                            style={[
                                styles.nav,
                                {
                                    height:
                                        (Platform.OS === 'ios' ? 52 : 62) +
                                        heightAdjust,
                                },
                            ]}>
                            {!hideBack && (
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityComponentType="button"
                                    accessibilityLabel={
                                        backButtonAccessibilityLabel
                                    }
                                    onPress={onBack || this.hide}>
                                    {backButton ? (
                                        <View
                                            style={{
                                                width: backCloseSize,
                                                height: backCloseSize,
                                            }}>
                                            {backButton}
                                        </View>
                                    ) : (
                                        <Icon.Ionicons
                                            name="ios-arrow-round-back"
                                            style={{
                                                fontSize: backCloseSize,
                                                color: iconColor,
                                                padding: heightAdjust / 2 + 10,
                                            }}
                                        />
                                    )}
                                </TouchableOpacity>
                            )}
                            <TextInput
                                ref={ref => (this.textInput = ref)}
                                onLayout={() =>
                                    focusOnLayout && this.textInput.focus()
                                }
                                style={[
                                    styles.input,
                                    {
                                        fontSize,
                                        fontFamily,
                                        color: textColor,
                                        marginLeft: hideBack ? 30 : 0,
                                        marginTop:
                                            Platform.OS === 'ios'
                                                ? heightAdjust / 2 + 10
                                                : 0,
                                    },
                                ]}
                                selectionColor={selectionColor}
                                onChangeText={input =>
                                    this._onChangeText(input)
                                }
                                onSubmitEditing={onSubmitEditing || undefined}
                                onFocus={onFocus || undefined}
                                onBlur={this._handleBlur}
                                placeholder={placeholder}
                                placeholderTextColor={placeholderTextColor}
                                value={this.state.input}
                                underlineColorAndroid="transparent"
                                returnKeyType="search"
                                autoCorrect={autoCorrect}
                                autoCapitalize={autoCapitalize}
                                keyboardType={keyboardType || 'default'}
                                keyboardAppearance={keyboardAppearance}
                                editable={editable}
                            />
                            <TouchableOpacity
                                accessible={true}
                                accessibilityComponentType="button"
                                accessibilityLabel={
                                    closeButtonAccessibilityLabel
                                }
                                onPress={
                                    hideX || this.state.input === ''
                                        ? undefined
                                        : this._handleX
                                }>
                                {closeButton ? (
                                    <View
                                        style={{
                                            width: backCloseSize,
                                            height: backCloseSize,
                                        }}>
                                        {closeButton}
                                    </View>
                                ) : (
                                    <Icon.Ionicons
                                        name="ios-close"
                                        size={backCloseSize}
                                        style={{
                                            color:
                                                hideX || this.state.input === ''
                                                    ? backgroundColor
                                                    : iconColor,
                                            padding: heightAdjust / 2 + 10,
                                        }}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Animated.View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        shadowRadius: 5,
        zIndex: 9999999,
        elevation: 3,
    },
    navWrapper: {
        width: Dimensions.get('window').width,
        zIndex: 9999999,
        elevation: 3,
    },
    nav: {
        ...Platform.select({
            android: {
                borderBottomColor: 'lightgray',
                borderBottomWidth: StyleSheet.hairlineWidth,
            },
        }),
        flex: 1,
        flexBasis: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 9999999,
        elevation: 3,
    },
    input: {
        ...Platform.select({
            ios: { height: 25 },
            android: { height: 45 },
        }),
        width: Dimensions.get('window').width - 120,
        zIndex: 9999999,
        elevation: 3,
    },
});
