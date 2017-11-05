// import { call, put, takeEvery, takeLatest, all, fork } from 'redux-saga/effects';
import { fork } from 'redux-saga/effects';
import appSaga from './containers/App/saga';
import homepagesaga from './containers/HomePage/saga';
import signupsaga from './containers/Signup/saga';
import signinsaga from './containers/Header/saga';


export default function* rootSaga() {
    yield [
        fork(appSaga),
        fork(homepagesaga),
        fork(signupsaga),
        fork(signinsaga),
    ];
}