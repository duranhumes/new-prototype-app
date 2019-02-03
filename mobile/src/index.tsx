import * as React from 'react';
import { UIManager } from 'react-native';
import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
    createAppContainer,
} from 'react-navigation';

import { NavigationService } from './services/NavigationService';
import ErrorBoundary from './ErrorBoundary';

import {
    HomeStack,
    AroundMeStack,
    SearchStack,
    NewsStack,
    EventsStack,
    CategoriesStack,
} from './screens';

const TabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    News: NewsStack,
    Events: EventsStack,
    AroundMe: AroundMeStack,
    Categories: CategoriesStack,
    Search: SearchStack,
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
            Main: MainNavigator,
        },
        {
            initialRouteName: 'Main',
        }
    )
);

if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
