import React, { Component } from 'react';
import {
    Container,
    Header,
    Badge,
    Title,
    Content,
    Footer,
    FooterTab,
    Form,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Item,
    Input,
    ListItem,
    H1, H2, H3,
    Text,
    Card,
    CardItem,
    CheckBox,
    Spinner,
    List,
} from 'native-base';
import {View} from 'react-native';

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
                            <Title>Header</Title>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Icon name='menu' />
                            </Button>
                        </Right>
                    </Header>

                    <Content>
                        <Card>
                            <CardItem header>
                                <H1>Header One</H1>
                            </CardItem>
                            <CardItem>
                                <H2>Header Two</H2>
                            </CardItem>
                            <CardItem>
                                <H3>Header Three</H3>
                            </CardItem>
                            <CardItem>
                                <Text>Default</Text>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem header>
                                <H2>Button</H2>
                            </CardItem>
                            <CardItem footer>
                                <Button>
                                    <Text>Button</Text>
                                </Button>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem header>
                                <H2>Badge</H2>
                            </CardItem>
                            <CardItem footer>
                                <Body>
                                    <Badge primary>
                                        <Text>primary</Text>
                                    </Badge>
                                    <Badge success>
                                        <Text>success</Text>
                                    </Badge>
                                    <Badge info>
                                        <Text>info</Text>
                                    </Badge>
                                    <Badge warning>
                                        <Text>warning</Text>
                                    </Badge>
                                    <Badge danger>
                                        <Text>danger</Text>
                                    </Badge>
                                    <Badge
                                        style={{ backgroundColor: 'black' }}>
                                        <Text>…</Text>
                                    </Badge>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem header>
                                <H2>CheckBox</H2>
                            </CardItem>
                            <ListItem>
                                <CheckBox checked={true} />
                                <Body>
                                <Text>Daily Stand Up</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <CheckBox checked={false} />
                                <Body>
                                <Text>Discussion with Client</Text>
                                </Body>
                            </ListItem>
                        </Card>
                        <Card>
                            <CardItem header>
                                <H2>Buttons</H2>
                            </CardItem>
                            <CardItem footer>
                                <Button>
                                    <Text>Button</Text>
                                </Button>
                            </CardItem>
                        </Card>
                    </Content>

                    <Footer>
                        <FooterTab>
                            <Button full>
                                <Text>Footer</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
        );
    }
}
