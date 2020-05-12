import {call, put, takeEvery} from 'redux-saga/effects'

function* postOrder(action: any) {
    try {
        yield call(() => {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(action.payload)
            };
            fetch('https://hamburger-b02c8.firebaseio.com/order.json', requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response;
                })
                .then(() => alert("Okay!"))
                .catch(() => alert("Not okay :("))
        });
        yield put({type: "ORDER_REQUESTED_SUCCEEDED"});
    } catch (e) {
        yield put({type: "ORDER_REQUESTED_FAILED", message: e.message});
    }
}

function* mySaga() {
    yield takeEvery("ORDER_REQUESTED", postOrder);
}

export default mySaga;