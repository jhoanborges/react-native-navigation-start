/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SideBar from './Partials/SideBar';
import Screen from './Components/Screen';
import Screen2 from './Components/Screen2';

import {createAppContainer} from 'react-navigation';
import {StyleProvider, Root} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import {createStackNavigator} from 'react-navigation-stack';

const Screen_StackNavigator = createStackNavigator({
  Home: {
    screen: Screen,
    navigationOptions: ({navigation}) => ({
      title: 'Screen 1',
      headerTitleStyle: {
        marginLeft: 10,
      },
      headerStyle: {
        backgroundColor: '#009FDA',
      },
      headerTintColor: '#fff',
    }),
  },
});

const Screen2_StackNavigator = createStackNavigator({
  Screen2: {
    screen: Screen2,
    navigationOptions: ({navigation}) => ({
      title: 'Screen 2',
      headerTitleStyle: {
        marginLeft: 10,
      },
      headerStyle: {
        backgroundColor: '#009FDA',
      },
      headerTintColor: '#fff',
    }),
  },
});

const HomeDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Screen_StackNavigator,
    },
    Screen2: {
      screen: Screen2_StackNavigator,
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: props => <SideBar {...props} />,
  },
);

const AppContainer = createAppContainer(HomeDrawerNavigator);

class App extends Component {
  constructor(props) {
    super(props);
    //this.state = {}
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Root>
          <AppContainer
            ref={nav => {
              this.navigator = nav;
            }}
          />

        </Root>
      </StyleProvider>
    );
  }
}

export default App;
