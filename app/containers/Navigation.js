import React, {Component} from 'react';
import {Navigator} from 'react-native';

import AppMenu from './Menu';
import Main from './Inventory';
// import Theme from './Theme';

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
                        name: 'Main',
                    },
                    // {
                    //     title: 'Style Guide',
                    //     name: 'Theme',
                    // }
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
                            // case 'Theme':
                            //     return <Theme {...{application:this, navigator}} {...route.passProps} />;
                        }
                    }
                }}
            />
        );
    }
}
