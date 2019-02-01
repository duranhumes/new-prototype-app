import * as React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { theme } from '../../constants';
import TabBarIcon from '../../components/TabBarIcon';

export const EventsStack = createStackNavigator(
    {
        Base: {
            getScreen: () => require('./Events').default,
        },
        Item: {
            getScreen: () => require('./EventsItem').default,
        },
    },
    {
        navigationOptions: {
            ...theme.primaryHeader,
            tabBarLabel: 'Events',
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name={
                        Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'
                    }
                />
            ),
        },
    }
);
