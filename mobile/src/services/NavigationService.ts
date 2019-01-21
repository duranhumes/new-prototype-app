import { Ref, ReactNode } from 'react';
import {
    NavigationActions,
    NavigationScreenProp,
    StackActions,
    NavigationNavigateAction,
    NavigationState,
} from 'react-navigation';

/**
 * Global navigation helper to be used
 * wherever in the app without the need to pass route props.
 */
let _navigator: NavigationScreenProp<any> | null = null;

/**
 * Sets navigator to this custom navigator
 *
 * @param {reference} ref from component
 */
function setTopLevelNavigator(ref: NavigationScreenProp<Ref<ReactNode>>) {
    _navigator = ref;
}

/**
 * Navigate to different screens.
 *
 * @param {string} routeName
 * @param {object} params
 */
function navigate(routeName: string, params: object) {
    _navigator!.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

/**
 * Use to go back one screen at a time.
 */
function back() {
    _navigator!.dispatch(NavigationActions.back());
}

/**
 * Resets navigation state to
 * specified actions and index.
 *
 * @param {object} actions
 * @param {string} index
 */
function reset({
    actions,
    index,
}: {
    actions: NavigationNavigateAction[];
    index: number;
}) {
    _navigator!.dispatch({
        index,
        actions,
        type: StackActions.RESET,
    });
}

/**
 * Recursively loop through all of the routes until the current route
 * is found then return that.
 *
 * @param {object} navigationState contains the current
 * navigation options.
 *
 * @returns {string / null} the current route name
 */
function getCurrentRouteName(navigationState: NavigationState): string | null {
    if (!navigationState) {
        return null;
    }

    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getCurrentRouteName(route as NavigationState);
    }

    return route.routeName;
}

export const NavigationService = {
    navigate,
    setTopLevelNavigator,
    back,
    reset,
    getCurrentRouteName,
    navigator: _navigator,
};
