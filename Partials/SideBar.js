import React, {Component} from 'react';
import {ImageBackground, FlatList, View, Image, Linking} from 'react-native';
import {Content, Text, ListItem, Icon, Container, Left} from 'native-base';
import styles from './SideBarStyle';

let cart = require('../Assets/cart.png');

const routes = [
  {
    name: 'Screen 1',
    route: 'Screen',
    icon: cart,
    bg: '#009FDA',
    types: '6',
    type: 'image',
  },

  {
    name: 'Screen 2',
    route: 'Screen2',
    icon: cart,
    bg: '#009FDA',
    type: 'image',
  },
];

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      left: 270,

      macAdress: null,
      visiblePassword: false,
    };
  }

  showPassword() {
    this.setState({
      visiblePassword: true,
    });
  }

  hidePassword() {
    this.setState({
      visiblePassword: false,
    });
  }

  openUrl(url) {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          alert('No se ha podido abrir la url ' + url, err);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => alert('No se ha podido abrir la url ' + url, err));
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{flex: 1, backgroundColor: '#fff', top: -1}}>
          <ImageBackground
            source={require('../Assets/bg.jpg')}
            style={{
              height: 120,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />

          <View
            style={{
              flex: 1,
              padding: 20,
              shadowColor: 'rgba(204, 204, 204, 0.1)',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 1,
              borderBottomWidth: 0.1,
            }}>
            <Text
              style={{
                color: '#005293',
                fontWeight: 'bold',
                fontSize: 18,
                textTransform: 'capitalize',
              }}>
              Bienvenido
            </Text>
          </View>

          <FlatList
            data={routes}
            keyExtractor={item => item.route}
            renderItem={({item}) => (
              <ListItem
                button
                noBorder
                onPress={() => {
                  this.props.navigation.navigate(item.route);
                  this.props.navigation.closeDrawer();
                }}>
                <Left>
                  {item.type === 'image' ? (
                    /*la iamgen de subastas del martillo es png asi que entonces ya no recibe variables tipo iconos workaround*/
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      source={item.icon}
                    />
                  ) : (
                    <Icon
                      active
                      name={item.icon}
                      style={{color: item.bg, fontSize: 20, width: 20}}
                      type={item.type}
                    />
                  )}

                  <Text style={styles.text}>{item.name}</Text>
                </Left>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
