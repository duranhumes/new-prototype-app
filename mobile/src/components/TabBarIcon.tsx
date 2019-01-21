import * as React from 'react';
import { Icon } from 'expo';

import { theme } from '../constants';

interface TabBarIconProps {
    name: string;
    focused: boolean;
}

export default function({ name, focused }: TabBarIconProps) {
    return (
        <Icon.Ionicons
            name={name}
            size={26}
            style={{ marginBottom: -3 }}
            color={focused ? theme.color.iconSelected : theme.color.iconDefault}
        />
    );
}
