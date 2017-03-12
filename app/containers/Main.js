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
import InventoryList from './InventoryList';

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
                    <Left>
                        <Button title="Menu" transparent onPress={this.props.application.menu.bind(this)}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Inventory</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Card>
                        <CardItem>
                            <Form>
                                <Item label="Code">
                                    <Input
                                        value={this.state.code}
                                        onChangeText={(code) => this.setState({code})}
                                        placeholder="EAN13"
                                        keyboardType={'numeric'}
                                    />
                                    <Icon name='camera' onPress={this._onPressButton.bind(this)} />
                                </Item>
                                <Item label="Price">
                                    <Input
                                        value={this.state.price}
                                        onChangeText={(price) => this.setState({price})}
                                        placeholder="0.00"
                                        keyboardType={'numeric'}
                                    />
                                </Item>
                                <Item label="Amount">
                                    <Input
                                        value={this.state.amount}
                                        onChangeText={(amount) => this.setState({amount})}
                                        placeholder="0"
                                        keyboardType={'numeric'}
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
                                            onPress={()=>this.setMeasurement(value)}
                                        >
                                            <Text textStyle={{textAlign: 'center'}}>{ value }</Text>
                                        </Button>
                                    ))}
                                </View>
                            </Form>
                        </CardItem>
                        <CardItem footer>
                            <Button title="Submit" full onPress={()=>this.addToInventory()} >
                                <Text>{ 'Submit' }</Text>
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
