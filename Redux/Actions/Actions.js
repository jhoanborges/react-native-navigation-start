export const FETCH_USER_DATA_PENDING = 'FETCH_USER_DATA_PENDING';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_ERROR = 'FETCH_USER_DATA_ERROR';

// action.js
export function fetchUserDataPending() {
  return {
    type: FETCH_USER_DATA_PENDING,
  };
}

export function fetchUserDataSuccess(res) {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    userdata: res,
  };
}

export function fetchUserDataError(error) {
  return {
    type: FETCH_USER_DATA_ERROR,
    error: error,
  };
}
