// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { put, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';

function* fetchUser(action) {
    // const data = fetch(...);
    try {
        yield put({ type: "LOGIN_SUCCESS" });
    } catch (e) {
        yield put({ type: "LOGIN_SUCCESS" });
    }
}

// function* fetchProducts(action) {
//     // const data = fetch(...);
//     console.log('---TuyenTN---app saga');
//     try {
//         yield put({ type: "LOGIN_SUCCESS" });
//     } catch (e) {
//         yield put({ type: "LOGIN_SUCCESS" });
//     }
// }

function* appSaga() {
  yield takeLatest("LOGIN_REQUEST", fetchUser);
//   yield takeLatest("PRODUCTS_REQUEST", fetchProducts);
}

export default appSaga;