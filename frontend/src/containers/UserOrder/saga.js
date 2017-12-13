import { put, takeLatest } from 'redux-saga/effects';
// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { address } from '../../config.js';
import { removeOrder } from './actions';

function* postForm(action) {
    // console.log('Log from Signup saga ', action.username);
    try {
        const url = `${address}/orders/`;
        // console.log(url,':',action.username,':',action.password);
        let response;
        // console.log("before call signin", response);
        yield axios.post(url, action.order)
        .then(res => {
            response = res;
            // console.log('RESPONSE saga = ', response);
        });
        yield put({ type: "RES_CREATE_ORDER", response });
    } catch (error) {
        yield put({ type: "ORDER_FAILDED", error });
    }
}

function* remove(action) {
    yield put({ type: "RES_REMOVE_ORDER"});
}

function* ordersaga() {
  yield takeLatest("CREATE_ORDER", postForm);
  yield takeLatest("REMOVE_ORDER", remove);
}

export default ordersaga;


