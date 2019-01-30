import * as React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { theme } from '../../constants';
import TabBarIcon from '../../components/TabBarIcon';

export const SearchStack = createStackNavigator(
    {
        Base: {
            getScreen: () => require('./Search').default,
        },
        Listing: {
            getScreen: () => require('./SearchListing').default,
        },
    },
    {
        navigationOptions: {
            ...theme.primaryHeader,
            tabBarLabel: 'Search',
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
                />
            ),
        },
    }
);
