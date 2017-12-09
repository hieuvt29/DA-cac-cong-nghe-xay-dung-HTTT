import { put, takeLatest } from 'redux-saga/effects';
// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { address } from '../../config.js';

function* getProductBySupplierId(action) {
    const url = `${address}/suppliers/`+action.supplier_id+'?association=true';
    let response;
    yield fetch(url)
    .then(res => { return res.json();})
    .then(responseJson => { response = responseJson });
    console.log('---Saga fetch pro by cat---', response);
    yield put({ type: "RES_PRODUCTBYSUP", response });
}

function* probycatsaga() {
  yield takeLatest("PRODUCTS_REQUEST_BY_SUPPLIER", getProductBySupplierId);
}


export default probycatsaga;


