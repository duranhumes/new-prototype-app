import * as React from 'react';
import { Text } from 'react-native';

class ErrorBoundary extends React.Component {
    static getDerivedStateFromError() {
        return { hasError: true };
    }

    state = {
        hasError: false,
    };

    componentDidCatch(error: any, info: any) {
        console.log({ error, info });
    }

    render() {
        if (this.state.hasError) {
            return <Text>Something went wrong.</Text>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
