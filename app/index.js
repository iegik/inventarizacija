import React, {Component} from 'react';
import { StyleProvider } from 'native-base';
import {
    StyleSheet,
    StatusBar,
    UIManager,
    View
} from 'react-native';
import Main from './containers/Theme';
import getTheme from './native-base-theme/components';

// https://facebook.github.io/react-native/docs/animations.html#layoutanimation
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends Component {
    render() {
        return (
            <StyleProvider style={getTheme()} >
                {/*<StatusBar backgroundColor='transparent' animated={true} translucent={true} barStyle="light-content"/>*/}
                <Main style={{flex:1}}/>
            </StyleProvider>
        );
    }
}
