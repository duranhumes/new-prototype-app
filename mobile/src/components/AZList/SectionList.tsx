import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { theme } from '../../constants';

const returnTrue = () => true;

interface IProps {
    onSectionSelect: (...args: any) => any;
    sections: any[];
    data: any[];
}

export default class SectionList extends React.Component<IProps> {
    lastSelectedIndex: number | null;
    measure: { y: number; width: number; height: number };

    constructor(props: IProps) {
        super(props);

        this.lastSelectedIndex = null;
        this.measure = {
            y: 0,
            width: 0,
            height: 0,
        };
    }

    onSectionSelect = (sectionId: string, fromTouch: boolean) => {
        if (this.props.onSectionSelect) {
            this.props.onSectionSelect(sectionId);
        }

        if (!fromTouch) {
            this.lastSelectedIndex = null;
        }
    };

    resetSection = () => {
        this.lastSelectedIndex = null;
    };

    detectAndScrollToSection = (e: any) => {
        const { pageY } = e.nativeEvent.touches[0] || e.nativeEvent;
        const { y: yAxis, height } = this.measure;
        if (!yAxis || pageY < yAxis) return;

        let index = Math.floor((pageY - yAxis) / height);
        index = Math.min(index, this.props.sections.length - 1);

        if (
            this.lastSelectedIndex !== index &&
            this.props.data[this.props.sections[index]].children.length
        ) {
            this.lastSelectedIndex = index;
            this.onSectionSelect(this.props.sections[index], true);
        }
    };

    fixSectionItemMeasure = () => {
        const sectionItem = this.refs.sectionItem0 as any;
        if (!sectionItem) return;

        const time = setTimeout(() => {
            clearTimeout(time);
            sectionItem.measure(
                (
                    _: any,
                    __: any,
                    width: number,
                    height: number,
                    ___: any,
                    pageY: number
                ) => {
                    this.measure = {
                        width,
                        height,
                        y: pageY,
                    };
                }
            );
        });
    };

    componentDidMount() {
        this.fixSectionItemMeasure();
    }

    componentDidUpdate() {
        this.fixSectionItemMeasure();
    }

    render() {
        const sections = this.props.sections.map((section, index) => {
            const textStyle = this.props.data[section].children.length
                ? styles.text
                : styles.inactivetext;

            return (
                <View
                    key={index}
                    ref={`sectionItem${index}`}
                    pointerEvents="none">
                    <View style={styles.item}>
                        <Text style={textStyle}>{section}</Text>
                    </View>
                </View>
            );
        });

        return (
            <View
                ref="view"
                style={styles.container}
                onStartShouldSetResponder={returnTrue}
                onMoveShouldSetResponder={returnTrue}
                onResponderGrant={this.detectAndScrollToSection}
                onResponderMove={this.detectAndScrollToSection}
                onResponderRelease={this.resetSection}>
                {sections}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: theme.color.white,
        alignItems: 'flex-end',
        justifyContent: 'center',
        right: 0,
        top: 0,
        bottom: 0,
    },
    item: {
        padding: 1,
    },
    text: {
        fontSize: 12,
        fontWeight: '400',
        color: theme.color.blueLight,
    },
    inactivetext: {
        fontSize: 12,
        fontWeight: '400',
        color: theme.color.greyLight,
    },
});
