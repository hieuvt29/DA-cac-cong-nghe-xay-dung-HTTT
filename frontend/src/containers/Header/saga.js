import { put, takeLatest } from 'redux-saga/effects';
// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { address } from '../../config.js';

function* postForm(action) {
    // console.log('Log from Signup saga ', action.username);
    try {
        const url = `${address}/login/`;
        // console.log(url,':',action.username,':',action.password);
        let response;
        yield axios.post(url, {
            userName: action.username,
            password: action.password,
        })
        .then(res => {
            response = res;
        });
        yield put({ type: "RES_SIGNIN", response });
    } catch (e) {
        yield put({ type: "SIGNIN_FAILED", e });
    }
}

function* signinsaga() {
  yield takeLatest("SIGNIN", postForm);
}

export default signinsaga;