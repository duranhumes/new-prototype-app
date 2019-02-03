import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { NavigationService } from '../../../services/NavigationService';
import { Spinner, AZList } from '../../../components';
import { makeCategoriesRequest } from '../functions';
import { IItem } from '../interfaces';
import { Card } from '../components';
import { theme } from '../../../constants';

interface IState {
    isLoading: boolean;
    categories: IItem[];
}

const getFirstLetter = (str: string) => str.charAt(0).toUpperCase();
const formatList = (list: IItem[]) => {
    const sortedList = [...list].sort((a, b) => a.title.localeCompare(b.title));

    return sortedList.reduce((before: object, current: IItem) => {
        const letter = getFirstLetter(current.title);
        if (!before[letter]) {
            before[letter] = { letter, children: [current] };
        } else {
            before[letter].children.push(current);
        }

        return before;
    }, {});
};

export class Base extends React.Component<any, IState> {
    state = {
        isLoading: false,
        categories: [],
    };

    handleNavigation = (categoryId: any) => {
        NavigationService.navigate('ItemList', { categoryId });
    };

    getCategories = async () => {
        this.setState({ isLoading: true });

        const categoriesItems = await makeCategoriesRequest();
        this.setState(state => ({
            categories: [...state.categories, ...categoriesItems],
            isLoading: false,
        }));
    };

    renderSectionHeader = (section: any) => {
        return (
            <View
                key={section.title}
                style={{
                    backgroundColor: theme.color.blueLightest,
                }}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 24,
                        textAlign: 'center',
                    }}>
                    {section.title}
                </Text>
            </View>
        );
    };

    async componentDidMount() {
        await this.getCategories();
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading && (
                    <Spinner
                        visible={this.state.isLoading}
                        animation="fade"
                        size="large"
                    />
                )}
                <View style={styles.categories}>
                    <AZList
                        data={formatList(this.state.categories)}
                        renderRow={(items: any) => {
                            return (
                                Array.isArray(items) &&
                                items.map((item: IItem) => (
                                    <Card
                                        key={item.id}
                                        data={item}
                                        handleNavigation={() =>
                                            this.handleNavigation(item.id)
                                        }
                                    />
                                ))
                            );
                        }}
                        rowHeight={40}
                        sectionHeaderHeight={10}
                        sectionHeader={this.renderSectionHeader}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    categories: {
        flex: 1,
        flexGrow: 7,
    },
});
