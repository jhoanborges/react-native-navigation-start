import {
  fetchUserDataPending,
  fetchUserDataSuccess,
  fetchUserDataError,
} from '../Actions/Actions';
import {Toast} from 'native-base';

function fetchUserData() {
  return async dispatch => {
    dispatch(fetchUserDataPending());

    await fetch('https://app.plazasendero.com.mx/api/product')
      .then(response => response.json())
      .then(res => {
        if (res.error) {
          throw res;
        }

        console.log(res);
        dispatch(fetchUserDataSuccess(res));
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
