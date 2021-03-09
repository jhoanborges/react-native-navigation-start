import React, {Component, useEffect} from 'react';
import { View, Text } from "react-native";
import RNBootSplash from "react-native-bootsplash";

import SideBar from './Partials/SideBar';
import LoginComponent from './Components/LoginComponent';
import Screen from './Components/Screen';
import Screen2 from './Components/Screen2';
import {StyleProvider, Root, Button} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
//Redux dependencies
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {userDataReducer} from './Redux/Reducers/Reducer';


import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const store = createStore(
  combineReducers({
    userdata: userDataReducer,
  }),
  applyMiddleware(thunk),
);
/*
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
  componentDidMount() {
    RNBootSplash.hide({duration: 1000});
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Root>
          <Provider store={store}>
            <AppContainer
              ref={nav => {
                this.navigator = nav;
              }}
            />
          </Provider>
        </Root>
      </StyleProvider>
    );
  }
}

export default App;
*/


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

function App() {

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
      console.log("Bootsplash has been hidden successfully");
    });
  }, []);


  return (
    <StyleProvider style={getTheme(material)}>
    <Root>
      <Provider store={store}>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={LoginComponent} />
        <Drawer.Screen name="Home" component={Screen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    </Provider>
        </Root>
      </StyleProvider>
  );
}

export default  App