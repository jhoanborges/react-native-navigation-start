import {
  FETCH_USER_DATA_PENDING,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_ERROR
} from "../Actions/Actions";

const initialState = {
  pending: false,
  userdata: [],
  error: null
};

export function userDataReducer(state = initialState, action) {
  //alert(JSON.stringify(action.userdata) )

  switch (action.type) {
    case FETCH_USER_DATA_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        pending: false,
        userdata: action.userdata
      };
    case FETCH_USER_DATA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const getUserData = state => state.userdata;
export const getUserDataPending = state => state.pending;
export const getUserDataError = state => state.error;
