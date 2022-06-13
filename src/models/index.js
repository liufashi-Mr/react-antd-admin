import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import models from './combine';
const store = createStore(models, applyMiddleware(thunk));
export default store;
