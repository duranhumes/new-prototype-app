import * as React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { theme } from '../../constants';
import TabBarIcon from '../../components/TabBarIcon';

export const CategoriesStack = createStackNavigator(
    {
        Base: {
            getScreen: () => require('./Categories').default,
        },
        ItemList: {
            getScreen: () => require('./CategoriesItemList').default,
        },
        Item: {
            getScreen: () => require('./CategoriesItem').default,
        },
    },
    {
        navigationOptions: {
            ...theme.primaryHeader,
            tabBarLabel: 'Categories',
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name={Platform.OS === 'ios' ? 'ios-filing' : 'md-filing'}
                />
            ),
        },
    }
);
