import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    Switch,
    TouchableHighlight,
    TextInput,
    InteractionManager,
    ScrollView,
} from 'react-native';
import Camera from 'react-native-camera';
import InventoryList from './InventoryList';
import RNFS from 'react-native-fs';

// MainBundlePath (String) The absolute path to the main bundle directory     undefined/test.csv
// CachesDirectoryPath (String) The absolute path to the caches directory     /data/data/com.inventarizacija/cache/test.csv
// DocumentDirectoryPath (String) The absolute path to the document directory /data/data/com.inventarizacija/files/test.csv
// TemporaryDirectoryPath (String) The absolute path to the temporary directory (iOS only)
// ExternalDirectoryPath (String) The absolute path to the external files, shared directory (android only) /storage/emulated/0/Android/data/com.inventarizacija/files/test.csv
// ExternalStorageDirectoryPath (String) The absolute path to the external storage, shared directory (android only) /storage/emulated/0/test.csv
const BASE_PATH = RNFS.ExternalStorageDirectoryPath;

export default class Main extends Component {
    state = {
        code: '',
        amount: '1',
        measurement: 'gab',
        price: '',
        showCamera: false,
        renderPlaceholderOnly: true,
        loadingCamera: true,
        inventory: [],
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                renderPlaceholderOnly: false,
                loadingCamera: false
            });
        });
    }

    renderScan = (
        <TouchableHighlight style={[styles.btn, {width}]}
                            onPress={this._onPressButton.bind(this)}>
            <Text style={[styles.text, styles.btnText,styles.text_center]}>Scan</Text>
        </TouchableHighlight>
    );

    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView;
        }
        return (
            <View style={styles.container}>
                <View style={styles.previewWrap}>
                    {this.state.showCamera ? (
                        <Camera
                            style={styles.preview}
                            aspect={Camera.constants.Aspect.fill}
                            flashMode={Camera.constants.FlashMode.on}
                            torchMode={Camera.constants.TorchMode.auto}
                            onBarCodeRead={this.readBarCode.bind(this)}
                            barCodeTypes={['ean13']}
                            barcodeScannerEnabled={true}
                        />
                    ) : (
                        this.renderScan
                    )}
                </View>
                {/*<View style={styles.switch}>*/}
                    {/*<Switch onValueChange={this._onPressButton.bind(this)}*/}
                        {/*value={this.state.showCamera} />*/}
                {/*</View>*/}

                <View style={styles.form}>
                    <View style={[styles.fieldset,styles.code]}>
                        <TextInput
                            style={[styles.text, styles.text_center, styles.field]}
                            value={this.state.code}
                            onChangeText={(code) => this.setState({code})}
                            placeholder="EAN13"
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={[styles.fieldset,styles.price]}>
                        <TextInput
                            style={[styles.text, styles.text_center, styles.field]}
                            value={this.state.price}
                            onChangeText={(price) => this.setState({price})}
                            placeholder="0.00"
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={[styles.fieldset,styles.amount]}>
                        <TextInput
                            style={[styles.text, styles.text_center, styles.field]}
                            value={this.state.amount}
                            onChangeText={(amount) => this.setState({amount})}
                            placeholder="0"
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={[styles.fieldset,styles.measurement]}>
                        <TouchableHighlight style={[styles.btn, this.state.measurement === 'gab' ? styles.btn_current : {}]} onPress={()=>this.setMeasurement('gab')} ><Text style={[styles.text, styles.btnText, this.state.measurement === 'gab' ? styles.btnText_current : {}]}>{ 'gab' }</Text></TouchableHighlight>
                        <TouchableHighlight style={[styles.btn, this.state.measurement === 'kg' ? styles.btn_current : {}]} onPress={()=>this.setMeasurement('kg')} ><Text style={[styles.text, styles.btnText, this.state.measurement === 'kg' ? styles.btnText_current : {}]}>{ 'kg' }</Text></TouchableHighlight>
                        <TouchableHighlight style={[styles.btn, this.state.measurement === 'l' ? styles.btn_current : {}]} onPress={()=>this.setMeasurement('l')} ><Text style={[styles.text, styles.btnText, this.state.measurement === 'l' ? styles.btnText_current : {}]}>{ 'l' }</Text></TouchableHighlight>
                    </View>
                    <View style={[styles.fieldset,styles.actions]}>
                        <TouchableHighlight style={[styles.btn]} onPress={()=>this.state.inventory.length ? this.exportData() : this.importData()} ><Text style={[styles.text, styles.text_center, styles.btnText]}>{ 'Sync' }</Text></TouchableHighlight>
                        <TouchableHighlight style={[styles.btn,styles.btn_primary]} onPress={()=>this.addToInventory()} ><Text style={[styles.text, styles.text_center, styles.btnText, styles.btnText_primary]}>{ 'Submit' }</Text></TouchableHighlight>
                    </View>
                </View>
                <InventoryList data={this.state.inventory} style={[styles.inventory]}/>
            </View>
        );
    }

    addToInventory() {
        let {inventory, code, amount, measurement, price} = this.state;
        let index = inventory.length;
        inventory.forEach((item, i) => {
            if(item.code === this.state.code){
                index = i;
            }
        });

        inventory[index] = {code, amount, measurement, price};
        this.setState({inventory});
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
        let code = event.data;
        if(this.state.code === code){
            return;
        }
        this.setState({
            code,
            showCamera: false,
        });
    }

    setMeasurement(measurement) {
        this.setState({measurement})
    }

    _onPressButton(value){
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                showCamera: value,
            });
        });
    }

    _renderPlaceholderView = (
        <View>
            <Text>Loading...</Text>
        </View>
    );
}

const {width, height} = Dimensions.get('window');

const $black = '#000000';
const $white = '#eeeeee';
const $lightGray = '#333333';
const $darkGray = '#111111';
const $yellow = '#eeee11';

const $vh = 100 / height;
const $rem = 120 * $vh;
const $M = $rem;
const $serif = 'monospace';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontFamily: $serif
    },
    previewWrap: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexGrow: 1,
        // height: 150
        //height: Dimensions.get('window').height,
    },
    preview: {
        width,
        height,
    },
    code: {
    },
    form: {
        flex: 1,
        flexGrow: 2,
    },
    measurement: {
        flex: 1,
        flexDirection: 'row',
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: $lightGray,
        borderColor: $black,
        borderWidth: 1
    },
    btn_primary: {
        backgroundColor: $yellow,
    },
    btn_current: {
        backgroundColor: $yellow,
    },
    btnText: {
        flex:1,
        color: $white,
        fontSize: $M,
        textAlignVertical: 'center',
    },
    btnText_current: {
        color: $darkGray,
    },
    btnText_primary: {
        color: $darkGray,
    },
    text_center: {
        textAlign: 'center',
    },
    field: {
        fontSize: $M,
    },
    fieldset:{
        padding: 0.25 * $rem,
        width: width - 0.5 * $rem,
    },
    switch: {
        alignItems: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inventory: {
        flexGrow: 1,
    }
});
