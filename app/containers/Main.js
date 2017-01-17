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
} from 'react-native';
import Camera from 'react-native-camera';

export default class Main extends Component {
    state = {
        code: '',
        amount: '1',
        measurement: 'gab',
        price: '0.00',
        showCamera: false,
        renderPlaceholderOnly: true,
        loadingCamera: true,
    };

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
            return this._renderPlaceholderView();
        }
        return (
            <View style={styles.container}>
                <View style={styles.previewWrap}>
                    {this.state.showCamera ? (<Camera
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}
                        flashMode={Camera.constants.FlashMode.on}
                        torchMode={Camera.constants.TorchMode.auto}
                        onBarCodeRead={this.readBarCode.bind(this)}
                        barCodeTypes={['ean13']}
                        barcodeScannerEnabled={true}
                        />) : (<Text style={styles.text_center}>Camera is off</Text>) }
                </View>
                <View style={styles.switch}>
                    <Switch onValueChange={this._onPressButton.bind(this)}
                        value={this.state.showCamera} />
                </View>
                <View style={styles.form}>
                    <View style={[styles.fieldset,styles.code]}>
                        <TextInput
                            style={[styles.text, styles.text_center, styles.field]}
                            value={this.state.code}
                            onChangeText={(code) => this.setState({code})}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={[styles.fieldset,styles.amount]}>
                        <TextInput
                            style={[styles.text, styles.text_center, styles.field]}
                            value={this.state.amount}
                            onChangeText={(amount) => this.setState({amount})}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={[styles.fieldset,styles.measurement]}>
                        <TouchableHighlight style={[styles.btn, this.state.measurement === 'gab' ? styles.btn_current : {}]} onPress={()=>this.setMeasurement('gab')} ><Text style={[styles.text, styles.btnText, this.state.measurement === 'gab' ? styles.btnText_current : {}]}>{ 'gab' }</Text></TouchableHighlight>
                        <TouchableHighlight style={[styles.btn, this.state.measurement === 'kg' ? styles.btn_current : {}]} onPress={()=>this.setMeasurement('kg')} ><Text style={[styles.text, styles.btnText, this.state.measurement === 'kg' ? styles.btnText_current : {}]}>{ 'kg' }</Text></TouchableHighlight>
                        <TouchableHighlight style={[styles.btn, this.state.measurement === 'l' ? styles.btn_current : {}]} onPress={()=>this.setMeasurement('l')} ><Text style={[styles.text, styles.btnText, this.state.measurement === 'l' ? styles.btnText_current : {}]}>{ 'l' }</Text></TouchableHighlight>
                    </View>
                    <View style={[styles.fieldset,styles.price]}>
                        <TextInput
                            style={[styles.text, styles.text_center, styles.field]}
                            value={this.state.price}
                            onChangeText={(price) => this.setState({price})}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <TouchableHighlight style={[styles.btn,styles.btn_primary]} onPress={()=>{}} ><Text style={[styles.text, styles.text_center, styles.btnText, styles.btnText_primary]}>{ 'Submit' }</Text></TouchableHighlight>
                </View>
            </View>
        );
    }

    readBarCode(event) {
        let code = event.data;
        if(this.state.code === code){
            return;
        }
        this.setState({code});
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

    _renderPlaceholderView() {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }
}

const {width, height} = Dimensions.get('window');

const $black = '#000000';
const $white = '#eeeeee';
const $lightGray = '#333333';
const $darkGray = '#111111';
const $yellow = '#eeee11';

const $vh = 100 / height;
const $rem = 120 * $vh;
const $XXL = 1.75 * $rem;
const $XL = 1.5 * $rem;
const $L = 1.25 * $rem;
const $M = 1 * $rem;
const $serif = 'monospace';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontFamily: $serif
    },
    previewWrap: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width,
        height: 25
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    measurement: {
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
        width,
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
    }
});
