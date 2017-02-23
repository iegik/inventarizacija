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
    H1, H2, H3,
    Text,
    Card,
    CardItem,
    Spinner,
    List,
} from 'native-base';
import {View} from 'react-native';

export default class extends Component {
    render() {
        return (
                <Container>
                    <Header>
                        <Left>
                            <Button transparent>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Header</Title>
                        </Body>
                        <Right />
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
                                <H2>Buttons</H2>
                            </CardItem>
                            <CardItem footer>
                                <Button>
                                    <Text>Button</Text>
                                </Button>
                            </CardItem>
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
