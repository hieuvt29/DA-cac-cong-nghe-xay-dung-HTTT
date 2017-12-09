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
        const account = {
            userName: action.username,
            password: action.password,
        };
        // console.log("before call signin", response);
        yield axios.post(url, account)
        .then(res => {
            response = res;
            // console.log('RESPONSE saga = ', response);
        });
        yield put({ type: "RES_SIGNIN", response });
    } catch (e) {
        yield put({ type: "SIGNIN_FAILED", e });
    }
}

function* search(action) {
    const url = `${address}/search?keywords=${action.searchKey}`;
    let response;
    yield fetch(url)
    .then(res => { return res.json();})
    .then(responseJson => { response = responseJson });
    // console.log('---TuyenTN---', response);
    yield put({ type: "RES_SEARCH", response });
}

function* getCategories(action) {
    const url = `${address}/categories/`;    
    let response;    
    yield fetch(url)
    .then(res => { return res.json();})
    .then(responseJson => { response = responseJson });
    // console.log('---TuyenTN---', response);
    yield put({ type: "RES_CATEGORIES", response });
}

function* signinsaga() {
  yield takeLatest("SIGNIN", postForm);
  yield takeLatest("SEARCH", search);
  yield takeLatest("REQ_CATEGORIES", getCategories);
}

export default signinsaga;


