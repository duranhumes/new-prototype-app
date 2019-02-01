import * as React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { theme } from '../../constants';
import TabBarIcon from '../../components/TabBarIcon';

export const NewsStack = createStackNavigator(
    {
        Base: {
            getScreen: () => require('./News').default,
        },
        Item: {
            getScreen: () => require('./NewsItem').default,
        },
    },
    {
        navigationOptions: {
            ...theme.primaryHeader,
            tabBarLabel: 'News',
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name={Platform.OS === 'ios' ? 'ios-paper' : 'md-paper'}
                />
            ),
        },
    }
);
