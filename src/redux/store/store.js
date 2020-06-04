import { createStore, applyMiddleware } from 'redux';
import { speedReducer } from './reducer';
import { logger } from 'redux-logger';

const store = createStore(speedReducer, applyMiddleware(logger));

export default store;
