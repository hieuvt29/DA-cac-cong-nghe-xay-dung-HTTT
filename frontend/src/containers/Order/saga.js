import { put, takeLatest } from 'redux-saga/effects';
// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { address } from '../../config.js';

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
    } catch (e) {
        yield put({ type: "ORDER_FAIL", e });
    }
}


function* ordersaga() {
  yield takeLatest("CREATE_ORDER", postForm);
}

export default ordersaga;


