import React, {Component} from 'react';
import {Navigator} from 'react-native';

import AppMenu from './Menu';
import Main from './Main';

export default class extends Component {
    menu(){
        this.props.navigator.push({
            name: 'Menu',
            title: 'Menu',
            index: 0,
            passProps: {
                dataArray: [
                    {
                        title: 'Inventory',
                        name: 'Main'
                    }
                ]
            }
        })
    }
    render() {
        return (
            <Navigator
                {...{
                    initialRoute: {name: 'Main'},
                    renderScene: (route, navigator) => {
                        switch (route.name) {
                            case 'Menu':
                                return <AppMenu {...{application:this, navigator}} {...route.passProps} />;
                            case 'Main':
                                return <Main {...{application:this, navigator}} {...route.passProps} />;
                        }
                    }
                }}
            />
        );
    }
}
