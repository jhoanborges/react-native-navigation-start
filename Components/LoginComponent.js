import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, TextInput, ActivityIndicator} from 'react-native';
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
import { bindActionCreators } from 'redux';

import { useDispatch, useSelector } from "react-redux";
import fetchUserData from '../Redux/Services/fetchUserData'

function LoginComponent({navigation}) {


  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
        console.log('login mounted')
    });
  }, []);


  const userdata = useSelector(state => state.userdata)
  const dispatch = useDispatch();


  const [loading, setLoading] = useState(false);

  const {control, handleSubmit, errors} = useForm();

  const onSubmit = data => {
    setLoading(true)
    dispatch(fetchUserData(data.email, data.password) )

    setTimeout(() => {
        setLoading(false)     
    }, 500);


  }

  return (
    <Container style={styles.content}>
      <View style={styles.MainContainer}>
          <Spinner
          visible={loading}
          customIndicator={<ActivityIndicator size="large"/>}
        />

        <Image
          style={{width: 250, height: 260, marginBottom: 20, marginTop: 10}}
          source={require('../Assets/login.png')}
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
              <Input onChangeText={value => onChange(value)} 
              value={value} 
              />
            </FormItem>
          )}
          name="email"
          defaultValue=""
        />
        {errors.email && <Text style={styles.error}>El campo email es requerido.</Text>}

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
        {errors.password && <Text style={styles.error}>El campo contraseña es requerido.</Text>}



        <Button
          style={{marginTop: 30, width: '100%'}}
          block
          bordered
          onPress={handleSubmit(onSubmit)}
          //onPress={() => onFormSubmit()}
        >
          <Image
            style={{width: 25, height: 25}}
            source={require('../Assets/mail.png')}
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



export default LoginComponent