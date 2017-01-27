import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


const store = createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default const store;
