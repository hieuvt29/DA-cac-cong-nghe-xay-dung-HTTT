import { put, takeLatest } from 'redux-saga/effects';
// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { address } from '../../config.js';

function* getProduct(action) {
    const url = `${address}/categories/`+action.category_id+'?association=true';
    let response;
    yield fetch(url)
    .then(res => { return res.json();})
    .then(responseJson => { response = responseJson });
    console.log('---Saga fetch pro by cat---', response);
    yield put({ type: "RES_PRODUCTBYCAT", response });
}

function* probycatsaga() {
  yield takeLatest("PRODUCTS_REQUEST_BY_CATEGORY", getProduct);
}


export default probycatsaga;


