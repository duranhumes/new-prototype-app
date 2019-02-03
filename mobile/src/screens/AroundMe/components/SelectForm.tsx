import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { VIEWPORT_WIDTH } from '../constants';

interface ISelectForm {
    categories: string[];
    categoryChange: (...args: any) => any;
    selectedCategory: number;
    distance: number;
    distanceChange: (...args: any) => any;
}

const pickerStyle = {
    icon: {
        top: 6,
    },
};

export class SelectForm extends React.Component<ISelectForm, any> {
    inputRefs: any;
    constructor(props: ISelectForm) {
        super(props);

        this.inputRefs = {};
    }

    render() {
        const {
            categories,
            categoryChange,
            selectedCategory,
            distance,
            distanceChange,
        } = this.props;
        return (
            <View style={styles.filters}>
                <View
                    style={{
                        flex: 0.45,
                        width: '100%',
                        padding: 7,
                        marginRight: 7,
                    }}>
                    <RNPickerSelect
                        placeholder={{
                            label: 'Select a category...',
                            value: null,
                        }}
                        items={categories.map(({ id, title }: any) => ({
                            label: title,
                            value: id,
                        }))}
                        onValueChange={categoryChange}
                        value={selectedCategory}
                        onUpArrow={() => {
                            this.inputRefs.name.focus();
                        }}
                        onDownArrow={() => {
                            this.inputRefs.picker.togglePicker();
                        }}
                        style={{
                            ...pickerStyle,
                        }}
                        ref={(el: any) => {
                            this.inputRefs.picker = el;
                        }}
                    />
                </View>

                <View
                    style={{
                        flex: 0.45,
                        width: '100%',
                        padding: 7,
                    }}>
                    <RNPickerSelect
                        placeholder={{
                            label: '1 Mile',
                            value: 1,
                        }}
                        items={[
                            { label: '3 Mile', value: 3 },
                            { label: '5 Mile', value: 5 },
                            { label: '10 Mile', value: 10 },
                        ]}
                        onValueChange={distanceChange}
                        value={distance}
                        onUpArrow={() => {
                            this.inputRefs.name.focus();
                        }}
                        onDownArrow={() => {
                            this.inputRefs.picker2.togglePicker();
                        }}
                        style={{
                            ...pickerStyle,
                        }}
                        ref={(el: any) => {
                            this.inputRefs.picker = el;
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    filters: {
        justifyContent: 'center',
        width: VIEWPORT_WIDTH,
        flexDirection: 'row',
        backgroundColor: 'rgba(252, 253, 253, 0.9)',
        opacity: 0.6,
        elevation: 2,
        zIndex: 10,
    },
});
