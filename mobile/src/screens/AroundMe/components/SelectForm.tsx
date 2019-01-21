import * as React from 'react';
import { Form } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const VIEWPORT_WIDTH = Dimensions.get('window').width;

interface ISelectForm {
    categories: string[];
    categoryChange: (...args: any) => {};
    selectedCategory: number;
    distance: number;
    distanceChange: (...args: any) => {};
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
            <Form style={styles.filters}>
                {/* <Picker
                    mode="dropdown"
                    iosHeader="Select a category"
                    placeholder="Select a category"
                    iosIcon={<Icon.Ionicons name="ios-arrow-down" />}
                    headerBackButtonText="x"
                    // headerBackButtonText={
                    //     <Icon.Ionicons name="ios-close" style={{ fontSize: 38 }} />
                    // }
                    style={{
                        width: VIEWPORT_WIDTH / 1.75,
                        marginRight: 10,
                    }}
                    selectedValue={selectedCategory}
                    onValueChange={categoryChange}>
                    {categories.map((category: any) => {
                        return (
                            <Picker.Item
                                key={category.id}
                                label={category.title}
                                value={category.id}
                            />
                        );
                    })}
                </Picker>
                <Picker
                    mode="dropdown"
                    iosHeader="Select distance"
                    placeholder="Select distance"
                    iosIcon={<Icon.Ionicons name="ios-arrow-down" />}
                    headerBackButtonText="x"
                    style={{ width: VIEWPORT_WIDTH / 2.6, marginLeft: 10 }}
                    selectedValue={distance}
                    onValueChange={distanceChange}>
                    <Picker.Item label="1 Mile" value={1} />
                    <Picker.Item label="3 Miles" value={3} />
                    <Picker.Item label="5 Miles" value={5} />
                    <Picker.Item label="10 Miles" value={10} />
                </Picker> */}
                <RNPickerSelect
                    placeholder={{
                        label: 'Select a distance...',
                        value: null,
                        color: '#9EA0A4',
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
                        this.inputRefs.picker2.togglePicker();
                    }}
                    style={{ width: VIEWPORT_WIDTH / 1.75, marginLeft: 10 }}
                    ref={(el: any) => {
                        this.inputRefs.picker = el;
                    }}
                />

                <RNPickerSelect
                    placeholder={{
                        label: 'Select a distance...',
                        value: null,
                        color: '#9EA0A4',
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
                    style={{ width: VIEWPORT_WIDTH / 2.6, marginLeft: 10 }}
                    ref={(el: any) => {
                        this.inputRefs.picker = el;
                    }}
                />
            </Form>
        );
    }
}
