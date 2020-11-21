import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from 'app/store/reducers/reducers';
import saga from 'app/store/sagas/sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewareEnhancer = applyMiddleware(sagaMiddleware);
const composedEnhancers = composeWithDevTools(middlewareEnhancer);

const configureStore = createStore(reducers, composedEnhancers);
sagaMiddleware.run(saga);

export * from './store.types';
export * from './reducers/reducers';
export { configureStore };
