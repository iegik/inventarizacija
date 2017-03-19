import React, {Component} from 'react';
import {
    Text,
    List,
    ListItem,
    Grid,
    Col,
} from 'native-base';

const {keys} = Object;

export default class InventoryList extends Component {
    _renderColumn = (data, key) => (
        <Col {...{
            key,
            style: styles['column_'+data.key],
        }} >
            <Text>{data.value}</Text>
        </Col>
    );

    _renderRow = (data, key) => {
        let renderItem = this._renderColumn.bind(this);
        let cols = keys(data).map((key)=>({key,value:data[key]}));
        return (
            <ListItem {...{key}}>
                <Grid {...{
                    renderItem
                }} >
                    {cols.map(renderItem)}
                </Grid>
            </ListItem>
        );
    };

    render() {
        let {data} = this.props;
        return (
            <List
                dataArray={data}
                renderRow={this._renderRow.bind(this)}
            />
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
