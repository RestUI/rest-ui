import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { crudSaga } from './sideEffect/saga';

export default function configureStore({ reducer, restClient, customSagas }) {
    const saga = function* rootSaga() {
        yield [
            crudSaga(restClient),
            ...customSagas,
        ].map(fork);
    };

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(reducer, undefined, compose(
        applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory)),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    ));

    sagaMiddleware.run(saga);

    return store;
}