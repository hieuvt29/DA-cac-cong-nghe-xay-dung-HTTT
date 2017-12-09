import { put, takeLatest } from 'redux-saga/effects';
// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { address } from '../../config.js';

function* postForm(action) {
    // console.log('Log from Signup saga ', action.username);
    try {
        const url = `${address}/register/`;
        // console.log(url,':',action.username,':',action.password);
        let response;
        let form = action.state;
        yield axios.post(url, {
            userName: form.username,
            password: form.password,
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            gender: form.gender,
            address: form.address,
            telephone: form.telephone,
        })
        .then(res => {
            response = res;
        });
        yield put({ type: "RES_SIGNUP", response });
    } catch (error) {
        yield put({ type: "SIGNUP_FAILED", error });
    }
}

function* signupsaga() {
    console.log('---Call Saga---' );
  yield takeLatest("SIGNUP", postForm);
}

export default signupsaga;