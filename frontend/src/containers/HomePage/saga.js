import { put, takeLatest } from 'redux-saga/effects';
// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { address } from '../../config.js';

function* fetchProducts(action) {
    try {
        const url = `${address}/products`;
        let response;
        yield axios.get(url)
        .then(res => {
            response = res;
        });
        yield put({ type: "RES_PRODUCTS", response });
    } catch (e) {
        yield put({ type: "GET_PRODUCTS_FAILED", e });
    }
}

function* homepagesaga() {
  yield takeLatest("PRODUCTS_REQUEST", fetchProducts);
}

export default homepagesaga;