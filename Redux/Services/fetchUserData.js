import {
  fetchUserDataPending,
  fetchUserDataSuccess,
  fetchUserDataError,
} from '../Actions/Actions';
import {Toast} from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function fetchUserData(email, password) {

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@token', value)
    } catch (e) {
      // saving error
    }
  }


  return async dispatch => {
    dispatch(fetchUserDataPending());

    await axios
      .post('https://developer.e-hop.mx/api/login', {
        email: email,
        password: password,
      })
      .then(res => {
        if (res.error) {
          throw res;
        }
        console.log(res.data);
        storeData(res.data.token)
        dispatch(fetchUserDataSuccess(res.data));
        return res;
      })
      .catch(error => {
        console.log(error);

        Toast.show({
          text: error.message,
          buttonText: 'Ok',
          duration: 5000,
        });

        dispatch(fetchUserDataError(error));
      });
  };
}

export default fetchUserData;
