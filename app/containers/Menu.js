import React, {Component} from 'react';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    List,
    ListItem,
    Spinner,
} from 'native-base';

export default class extends Component {
    back() {
        this.props.navigator.jumpBack()
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button {...{
                            title:"Back",
                            transparent: true,
                            onPress: this.back.bind(this),
                        }} >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Menu</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List {...{
                        renderRow: ({title, name}) =>
                            <ListItem {...{
                                onPress: () => {
                                    this.props.navigator.push({name})
                                }
                            }} >
                                <Text>{title}</Text>
                            </ListItem>,
                        dataArray: this.props.dataArray || []
                    }} />
                </Content>
            </Container>
        );
    }
}
