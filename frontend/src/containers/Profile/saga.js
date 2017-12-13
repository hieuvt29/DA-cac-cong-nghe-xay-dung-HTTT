import { put, takeLatest } from 'redux-saga/effects';
// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { address } from '../../config.js';

function* updateInfo(action) {
    
    try {
      const url = `${address}/user`;
      let response;
      // console.log("before call signin", response);
      yield axios.put(url, action.customer)
      .then(res => {
          response = res;
          // console.log('RESPONSE saga = ', response);
      });
      yield put({ type: "RES_UPDATE_INFO", response });
    } catch (error) {
        yield put({ type: "UPDATE_INFO_FAILDED", error });
    }
}

function* probycatsaga() {
  yield takeLatest("UPDATE_INFO", updateInfo);
}


export default probycatsaga;


