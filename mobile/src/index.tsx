import * as React from 'react';
import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
    createAppContainer,
} from 'react-navigation';

import { NavigationService } from './services/NavigationService';
import ErrorBoundary from './ErrorBoundary';

import { HomeStack, AroundMeStack } from './screens';

const TabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    AroundMe: AroundMeStack,
});

const MainNavigator = createStackNavigator(
    {
        Tab: TabNavigator,
    },
    {
        mode: 'modal',
        navigationOptions: {
            header: null,
        },
    }
);

const AppNavigator = createAppContainer(
    createSwitchNavigator(
        {
            // Splash: {
            //     getScreen: () => require('./screens/Splash').default,
            // },
            Main: MainNavigator,
        },
        {
            initialRouteName: 'Main',
        }
    )
);

export default class Root extends React.Component {
    render() {
        return (
            <ErrorBoundary>
                <AppNavigator
                    ref={(r: any) => NavigationService.setTopLevelNavigator(r)}
                />
            </ErrorBoundary>
        );
    }
}
