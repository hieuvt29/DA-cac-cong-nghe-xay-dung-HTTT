import { put, takeLatest } from 'redux-saga/effects';
// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { address } from '../../config.js';
import { removeOrder } from './actions';
import orderStates from '../common/order-states';

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

function* getCustomerOrders(action) {

    const url = `${address}/orders?accountId=` + action.customerId;
    let response;
    yield fetch(url)
    .then(res => { return res.json();})
    .then(responseJson => { response = responseJson });
    // console.log('---TuyenTN---', response);
    yield put({ type: "RES_CUSTOMER_ORDERS", response });

}
function* cancelCustomerOrder(action){
    // console.log('Log from Signup saga ', action.username);
    try {
        const url = `${address}/orders/` + action.orderId;
        // console.log(url,':',action.username,':',action.password);
        let response;
        // console.log("before call signin", response);
        yield axios.put(url, {newState: orderStates.CANCELLED})
        .then(res => {
            response = res;
        });
        yield put({ type: "RES_CANCEL_ORDER", response });
    } catch (error) {
        yield put({ type: "CANCEL_ORDER_FAILED", error });
    }
}
function* userOrderSaga() {
  yield takeLatest("GET_CUSTOMER_ORDERS", getCustomerOrders);
  yield takeLatest("CANCEL_CUSTOMER_ORDER", cancelCustomerOrder)

}

export default userOrderSaga;


