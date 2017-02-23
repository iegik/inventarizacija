import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';
import Grid from 'react-native-grid-component';
import {
    Form,
    Left,
    Right,
    Body,
    Item,
    Text,
    List,
    ListItem,
} from 'native-base';
const {keys} = Object;

export default class InventoryList extends Component {
    _renderColumn = (data, i) => (
        <ListItem
            key={i}
            style={styles['column_'+data.key]}
        >
            <Text>{data.value}</Text>
        </ListItem>
    );

    _renderRow = (data, i) => {
        let cols = keys(data).map((key)=>({key,value:data[key]}));
        return (
            <Grid
                key={i}
                renderItem={this._renderColumn}
                itemsPerRow={cols.length}
                data={cols}
            />
        );
    };

    render() {
        let {data} = this.props;
        return (
            <List>
                <Grid
                    renderItem={this._renderRow}
                    itemsPerRow={1}
                    data={data}
                />
            </List>
        );
    }
}

const styles = {
    column_title: {
        flexGrow : 4,
    },
    column_code: {
        flexGrow : 4,
    },
    column_amount: {
        flexShrink: 1,
        flexGrow : 1,
    },
    column_measurement: {
        flexShrink: 1,
        flexGrow : 1,
    },
    column_price: {
        flexShrink: 1,
        flexGrow : 2,
    },
};
