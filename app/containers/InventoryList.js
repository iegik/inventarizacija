import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import Grid from 'react-native-grid-component';
const {keys} = Object;

export default class InventoryList extends Component {
    _renderColumn = (data, i) => (
        <View
            key={i}
            style={[styles.column, styles['column_'+data.key]]}
        >
            <Text>{data.value}</Text>
        </View>
    );

    _renderRow = (data, i) => {
        let cols = keys(data).map((key)=>({key,value:data[key]}));
            //.filter((item) => ['code'].indexOf(item.key) > -1);
        // , this.props.current === data.code ? styles.current : {}
        return (
            <View
                key={i}
                style={[styles.row]}
            >
                <Grid
                    renderItem={this._renderColumn}
                    itemsPerRow={cols.length}
                    data={cols}
                />
            </View>
        );
    };

    render() {
        let {style, data} = this.props;
        return (
            <ScrollView style={[styles.container, style]}>
                <Grid
                    renderItem={this._renderRow}
                    itemsPerRow={1}
                    data={data}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    row: {
        flex: 1,
        borderBottomWidth: 1,
    },
    column: {
        flex: 1,
        // flexGrow: 2,
        // flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
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
    current: {
        backgroundColor: '#00FF00'
    }
});
