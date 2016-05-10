import { take, call, put } from 'redux-saga/effects';
import * as actionTypes from '../actions/action-types';
import API from '../API';

function* userLoginTask(email, password) {
  console.log('saga user login task');
  try {
    const response = yield call(API.AUTH.userSignin, email, password);
    yield put({ type: actionTypes.LOGIN_SUCCESS });
    return response.access_token;
  } catch (error) {
    console.log(error + 'this is error');
    yield put({ type: actionTypes.LOGIN_ERROR, error });
  }
}

export default function* authSagas() {
  while (true) {
    const { email, password } = yield take(actionTypes.LOGIN_REQUEST);
    const access_token = yield call(userLoginTask, email, password);
    if (access_token) {
      localStorage.setItem('token', access_token);
      yield take(actionTypes.LOGOUT);
      localStorage.removeItem('token');
    }
  }
}
