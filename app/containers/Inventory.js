import React, {Component} from 'react';
import {
    Container,
    Header,
    Title,
    Content,
    Form,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Item,
    Input,
    Text,
    Card,
    CardItem,
    Spinner,
} from 'native-base';
import {
    Dimensions,
    View,
    InteractionManager,
} from 'react-native';
import Camera from 'react-native-camera';
import RNFS from 'react-native-fs';

import InventoryList from './InventoryList';
import InventoryStore from '../stores/InventoryStore';
import ProductStore from '../stores/ProductStore';
import actionTypes from '../stores/actionTypes';

// MainBundlePath (String) The absolute path to the main bundle directory     undefined/test.csv
// CachesDirectoryPath (String) The absolute path to the caches directory     /data/data/com.inventarizacija/cache/test.csv
// DocumentDirectoryPath (String) The absolute path to the document directory /data/data/com.inventarizacija/files/test.csv
// TemporaryDirectoryPath (String) The absolute path to the temporary directory (iOS only)
// ExternalDirectoryPath (String) The absolute path to the external files, shared directory (android only) /storage/emulated/0/Android/data/com.inventarizacija/files/test.csv
// ExternalStorageDirectoryPath (String) The absolute path to the external storage, shared directory (android only) /storage/emulated/0/test.csv
const BASE_PATH = RNFS.ExternalStorageDirectoryPath;

const {
    INVENTORY_CREATE,
    INVENTORY_UPDATE,
    INVENTORY_DELETE,
    INVENTORY_FLUSH,
    CURRENT_PRODUCT_INCRIMENT,
    CURRENT_PRODUCT_DECRIMENT,
    CURRENT_PRODUCT_UPDATE,
    SET_CURRENT_PRODUCT_CODE,
    SET_CURRENT_PRODUCT_PRICE,
    SET_CURRENT_PRODUCT_AMOUNT,
    SET_CURRENT_PRODUCT_MEASUREMENT,
} = actionTypes;
let inventoryStore = new InventoryStore();
let productStore = new ProductStore();

export default class extends Component {
    state = {
        currentProduct: productStore.reducer({
            code: '',
            amount: 1,
            measurement: 'gab',
            price: '',
        }),
        showCamera: false,
        renderPlaceholderOnly: true,
        loadingCamera: true,
        inventory: inventoryStore.reducer(),
    };

    dispatch(action) {
        this.setState((prevState) => {
            let currentProduct = productStore.reducer(prevState.currentProduct, action);
            let inventory = inventoryStore.reducer(prevState.inventory, action);
            switch (action.type) {
                case SET_CURRENT_PRODUCT_PRICE:
                    inventory = inventoryStore.reducer(inventory, {type: INVENTORY_UPDATE, value: currentProduct});
                    break;
                case SET_CURRENT_PRODUCT_AMOUNT:
                    inventory = inventoryStore.reducer(inventory, {type: INVENTORY_UPDATE, value: currentProduct});
                    break;
                case SET_CURRENT_PRODUCT_MEASUREMENT:
                    inventory = inventoryStore.reducer(inventory, {type: INVENTORY_UPDATE, value: currentProduct});
                    break;
            }
            return {
                currentProduct,
                inventory,
            }
        });
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                renderPlaceholderOnly: false,
                loadingCamera: false
            });
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView;
        }
        if (this.state.showCamera) {
            return (
                <Camera
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    flashMode={Camera.constants.FlashMode.on}
                    torchMode={Camera.constants.TorchMode.auto}
                    onBarCodeRead={this.readBarCode.bind(this)}
                    barCodeTypes={['ean13']}
                    barcodeScannerEnabled={true}
                >
                    <Header>
                        <Left>
                            <Button title="Back" transparent onPress={()=>this.setState({showCamera: false})}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                        <Title>Scanner</Title>
                        </Body>
                        <Right />
                    </Header>
                </Camera>
            );
        }

        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Inventory</Title>
                    </Body>
                    <Right>
                        <Button title="Menu" transparent onPress={this.props.application.menu.bind(this)}>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Card>
                        <CardItem>
                            <Form>
                                <Item label="Code">
                                    <Input
                                        value={this.state.currentProduct.code}
                                        onChangeText={(value) => this.dispatch({type: SET_CURRENT_PRODUCT_CODE, value})}
                                        onEndEditing={this.updateInventory.bind(this)}
                                        placeholder="EAN13"
                                        keyboardType={'numeric'}
                                        selectTextOnFocus={true}
                                    />
                                    <Icon name='camera' onPress={this._onPressButton.bind(this)} />
                                </Item>
                                <Item label="Price">
                                    <Input
                                        value={this.state.price}
                                        onChangeText={(value) => this.dispatch({type: SET_CURRENT_PRODUCT_PRICE, value})}
                                        placeholder="0.00"
                                        keyboardType={'numeric'}
                                        selectTextOnFocus={true}
                                    />
                                </Item>
                                <Item label="Amount">
                                    <Input
                                        value={this.state.amount}
                                        onChangeText={(value) => this.dispatch({type: SET_CURRENT_PRODUCT_AMOUNT, value})}
                                        placeholder="0"
                                        keyboardType={'numeric'}
                                        selectTextOnFocus={true}
                                    />
                                </Item>
                                <View style={styles.buttonGroup}>
                                    {['l','kg','gab'].map((value)=>(
                                        <Button
                                            title="Measurement"
                                            key={value}
                                            light={this.state.measurement !== value}
                                            style={styles.buttonGroupBtn}
                                            active={this.state.measurement === value}
                                            onPress={() => this.dispatch({type: SET_CURRENT_PRODUCT_MEASUREMENT, value})}
                                        >
                                            <Text textStyle={{textAlign: 'center'}}>{ value }</Text>
                                        </Button>
                                    ))}
                                </View>
                            </Form>
                        </CardItem>
                        <CardItem footer>
                            <Button title="Submit" full onPress={()=>this.state.inventory.length ? this.exportData() : this.importData()} >
                                <Text>{ 'Save' }</Text>
                            </Button>
                        </CardItem>
                    </Card>
                    <Card>
                        <InventoryList data={this.state.inventory} style={[styles.inventory]}/>
                    </Card>
                </Content>
            </Container>
        );
    }

    updateInventory() {
        this.dispatch({type: INVENTORY_UPDATE, value: this.state.currentProduct});
    }

    getFileName() {
        return 'inventarizacija.csv';
    }
    stringify(inventory){
        return inventory.map(({code, amount, measurement, price}) => [code, amount, measurement, price].join(',')).join(';\n');
    }
    parse(contents){
        return contents.split(';\n').map((row) => {
            let cols = row.split(',');
            return {code: cols[0], amount: cols[1], measurement: cols[2], price: cols[3]}
        });
    }

    exportData(){
        let {inventory} = this.state;
        let fileName = this.getFileName();
        let path = BASE_PATH + '/' + fileName;
        let data = this.stringify(inventory);

        RNFS.writeFile(path, data, 'utf8')
            .then(() => {
                console.log('FILE WRITTEN!', path, data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    importData() {
        let fileName = this.getFileName();

        // get a list of files and directories in the main bundle
        RNFS.readDir(BASE_PATH)
            .then((result) => {
                let file = result.filter((file) => file.name === fileName)[0];
                if(!file){
                    return Promise.reject({message: 'File not found', code: 404})
                }
                // stat the first file
                return Promise.all([RNFS.stat(file.path), file.path]);
            })
            .then((statResult) => {
                if (statResult[0].isFile()) {
                    // if we have a file, read it
                    return RNFS.readFile(statResult[1], 'utf8');
                }
                return Promise.reject({message: 'Unsupported Media Type', code: 415});
            })
            .then((contents) => {
                let inventory = this.parse(contents);
                this.setState({inventory})
            })
            .catch((err) => {
                console.log(err.message, err.code);
            });
    }

    readBarCode(event) {
        let value = event.data;
        if(this.state.code === value){
            return;
        }
        this.dispatch({type: SET_CURRENT_PRODUCT_CODE, value});
        this.setState({showCamera: false});
    }

    _onPressButton(value){
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                showCamera: value,
            });
        });
    }

    _renderPlaceholderView = (
        <Spinner/>
    );
}

const {width, height} = Dimensions.get('window');

const $vh = 100 / height;
const $rem = 120 * $vh;

const styles = ({
    preview: {
        width,
        height,
    },
    buttonGroup: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: $rem,
    },
    buttonGroupBtn: {
        borderRadius: 0,
        width: width / 3 - (0.25 * $rem),
    },
    inventory: {
        flexGrow: 1,
    }
});
