import React, {Component, useEffect, useState} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import Screen from './Components/Screen';
import Screen2 from './Components/Screen2';
import {StyleProvider, Root} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
//Redux dependencies
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {userDataReducer} from './Redux/Reducers/Reducer';
import axios from 'axios';
import {Toast} from 'native-base';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  Container,
  Text,
  Button,
  Content,
  Form,
  Label,
  Item as FormItem,
  Input,
} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import Spinner from 'react-native-loading-spinner-overlay';
import {bindActionCreators} from 'redux';
import fetchUserData from './Redux/Services/fetchUserData';
import {useDispatch, useSelector} from 'react-redux';
//import fetchUserData from '../Redux/Services/fetchUserData'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import SideBar from './Partials/SideBar';

function CustomDrawerContent(props) {
  return (
      <SideBar {...props} />
  );
}

const AuthContext = React.createContext();

const store = createStore(
  combineReducers({
    userdata: userDataReducer,
  }),
  applyMiddleware(thunk),
);

function LoginComponent({navigation}) {
  const [loading, setLoading] = useState(false);

  const {control, handleSubmit, errors} = useForm();
  const {signIn} = React.useContext(AuthContext);

  const onSubmit = data => {
    signIn(data.email, data.password);
  };

  return (
    <Container style={styles.content}>
      <View style={styles.MainContainer}>
        <Spinner
          visible={loading}
          customIndicator={<ActivityIndicator size="large" />}
        />

        <Image
          style={{width: 250, height: 260, marginBottom: 20, marginTop: 10}}
          source={require('./Assets/login.png')}
        />

        <Text
          style={{
            fontSize: 23,
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 10,
            color: '#005293',
          }}>
          {' '}
          Iniciar Sesión
        </Text>

        <Controller
          control={control}
          rules={{required: true}}
          render={({onChange, onBlur, value}) => (
            <FormItem floatingLabel>
              <Label>Usuario</Label>
              <Input onChangeText={value => onChange(value)} value={value} />
            </FormItem>
          )}
          name="email"
          defaultValue=""
        />
        {errors.email && (
          <Text style={styles.error}>El campo email es requerido.</Text>
        )}

        <Controller
          control={control}
          rules={{required: true}}
          render={({onChange, onBlur, value}) => (
            <FormItem floatingLabel>
              <Label>Contraseña</Label>
              <Input onChangeText={value => onChange(value)} value={value} />
            </FormItem>
          )}
          name="password"
          defaultValue=""
        />
        {errors.password && (
          <Text style={styles.error}>El campo contraseña es requerido.</Text>
        )}

        <Button
          style={{marginTop: 30, width: '100%'}}
          block
          bordered
          onPress={handleSubmit(onSubmit)}
          //onPress={() => onFormSubmit()}
        >
          <Image
            style={{width: 25, height: 25}}
            source={require('./Assets/mail.png')}
          />
          <Text style={{color: '#009FDA', fontSize: 20, fontWeight: 'bold'}}>
            Login
          </Text>
        </Button>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  content: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  error: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: '#bf1650',
  },
});

const Drawer = createDrawerNavigator();

function App() {
  //login token
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('token');
      } catch (e) {
        // Restoring token failed
      }
      console.log('Token de usuario encontrado');
      console.log(userToken);
      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (email, password) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        console.log(email);
        await axios
          .post('https://developer.e-hop.mx/api/login', {
            email: email,
            password: password,
          })
          .then(async res => {
            if (res.error) {
              throw res;
            }
            console.log(res.data);

            try {
              await AsyncStorage.setItem('token', res.data.token);
              console.log('saved token');
            } catch (e) {
              console.log(e);
              // saving error
            }
            dispatch({type: 'SIGN_IN', token: res.data.token});
            return res;
          })
          .catch(error => {
            console.log(error);

            Toast.show({
              text: error.message,
              buttonText: 'Ok',
              duration: 5000,
            });
          });
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);

  function SplashScreen() {
    return (
      <View style={styles.MainContainer}>
        <Spinner
          visible={true}
          customIndicator={<ActivityIndicator size="large" />}
        />
      </View>
    );
  }

  return (
    <StyleProvider style={getTheme(material)}>
        <Root>
          <AuthContext.Provider value={authContext}>
            <NavigationContainer>
              <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={props => <CustomDrawerContent {...props} />}
                >
                {state.isLoading ? (
                  // We haven't finished checking for the token yet
                  <Drawer.Screen name="Splash" component={SplashScreen} />
                ) : state.userToken == null ? (
                  // No token found, user isn't signed in
                  <Drawer.Screen name="Login" component={LoginComponent} />
                ) : (
                  // User is signed in
                  <Drawer.Screen name="Home" component={Screen} />
                )}
              </Drawer.Navigator>
            </NavigationContainer>
          </AuthContext.Provider>
        </Root>
    </StyleProvider>
  );
}

export default App;
