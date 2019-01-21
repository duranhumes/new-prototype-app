import * as React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { theme } from '../../constants';
import TabBarIcon from '../../components/TabBarIcon';

export const HomeStack = createStackNavigator(
    {
        HomeScreen: {
            getScreen: () => require('./Home').default,
        },
    },
    {
        navigationOptions: {
            ...theme.primaryHeader,
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
                />
            ),
        },
    }
);
