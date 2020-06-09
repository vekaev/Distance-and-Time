import { createStore, applyMiddleware } from 'redux';
import { filterReducer } from '../reducers/reducer';
import { logger } from 'redux-logger';

const store = createStore(filterReducer, applyMiddleware(logger));

export default store;
