import { takeEvery, put } from 'redux-saga/effects';
import { GET_INIT_LIST } from 'app/store/actions/actionTypes';
import { getInitDataAction } from 'app/store/actions/createActions';
import axios from 'axios';

function* getInitListData() {
	try {
		const res = yield axios.get('/test');
		const action = getInitDataAction(res.data.data);
		yield put(action);
	} catch (error) {
		console.log('error: ', error);
	}
}

function* mySaga() {
	yield takeEvery(GET_INIT_LIST, getInitListData);
}

export default mySaga;
