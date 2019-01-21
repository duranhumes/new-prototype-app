import * as React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { theme } from '../../constants';
import TabBarIcon from '../../components/TabBarIcon';

export const AroundMeStack = createStackNavigator(
    {
        AroundMeScreen: {
            getScreen: () => require('./AroundMe').default,
        },
        AroundMeListing: {
            getScreen: () => require('./AroundMeListing').default,
        },
    },
    {
        navigationOptions: {
            ...theme.primaryHeader,
            tabBarLabel: 'AroundMe',
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name={
                        Platform.OS === 'ios' ? 'ios-cellular' : 'md-cellular'
                    }
                />
            ),
        },
    }
);
