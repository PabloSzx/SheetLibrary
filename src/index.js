import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { requireAuth } from './utils/secure';
import * as reducers from './reducers'
import App from './components/App'
import Home from './components/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Logout from './components/auth/Logout'
import Dashboard from './components/secure/Dashboard'
import Profile from './components/secure/Profile'
import New from './components/secure/New'
import Edit from './components/secure/Edit';

const reducer = combineReducers({
	...reducers,
	routing: routerReducer,
	form: formReducer
});

//noinspection JSUnresolvedVariable
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(routerMiddleware(browserHistory))),
	applyMiddleware(thunk)
);

const history = syncHistoryWithStore(browserHistory, store);

const secure = requireAuth(store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path='/' component={App}>
				<IndexRoute component={Home}/>
				<Route path='login' component={Login}/>
				<Route path='register' component={Register}/>
				<Route path='logout' component={Logout}/>
				<Route path='dashboard' component={Dashboard} onEnter={secure}/>
				<Route path='new' component={New} onEnter={secure}/>
				<Route path='profile' component={Profile} onEnter={secure}/>
				<Route path='library/:id' component={Edit}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);
