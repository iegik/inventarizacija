import React, {Component} from 'react';
import {
    StyleSheet,
    StatusBar,
    UIManager,
    View
} from 'react-native';
import Demo from './containers/Demo';

// https://facebook.github.io/react-native/docs/animations.html#layoutanimation
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='transparent' animated={true} translucent={true} barStyle="light-content"/>
                <Demo />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
