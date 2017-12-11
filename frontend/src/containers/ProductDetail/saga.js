import { put, takeLatest } from 'redux-saga/effects';
// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { address } from '../../config.js';

function* getProduct(action) {
    const url = address + '/products/'+action.productId;
    let response;    
    yield fetch(url)
    .then(res => { return res.json();})
    .then(responseJson => { response = responseJson });
    // console.log('---TuyenTN---', response);
    yield put({ type: "RES_PRODUCTDETAIL", response });
}

function* productdetailsaga() {
  yield takeLatest("GET_PRODUCT", getProduct);
}


export default productdetailsaga;


