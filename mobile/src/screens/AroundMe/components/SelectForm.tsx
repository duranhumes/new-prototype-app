import * as React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const VIEWPORT_WIDTH = Dimensions.get('window').width;

interface ISelectForm {
    categories: string[];
    categoryChange: (...args: any) => any;
    selectedCategory: number;
    distance: number;
    distanceChange: (...args: any) => any;
}

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
                <RNPickerSelect
                    placeholder={{
                        label: 'Select a category...',
                        value: null,
                    }}
                    items={categories.map(({ id, category }: any) => ({
                        label: category,
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
                    style={{ width: VIEWPORT_WIDTH }}
                    ref={(el: any) => {
                        this.inputRefs.picker = el;
                    }}
                />

                <RNPickerSelect
                    placeholder={{
                        label: 'Select a distance...',
                        value: null,
                    }}
                    items={[
                        { label: '1 Mile', value: 1 },
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
                    style={{ width: VIEWPORT_WIDTH }}
                    ref={(el: any) => {
                        this.inputRefs.picker = el;
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    filters: {
        width: VIEWPORT_WIDTH,
        flexDirection: 'row',
        backgroundColor: 'rgba(252, 253, 253, 0.9)',
        opacity: 0.6,
        elevation: 2,
        zIndex: 10,
    },
});
