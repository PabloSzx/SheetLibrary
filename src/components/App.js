import React from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { push } from 'react-router-redux';
import { login, logout, resetNext } from '../actions/auth';

class App extends React.Component {
	state = {
		loaded: false
	};
	componentWillMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.props.onLogin(user);
				this.props.onRedirect(this.props.next || '/dashboard');
				this.props.onResetNext();
			} else if (this.props.user) {
					this.props.onRedirect('/');
					this.props.onResetNext();
				} else {
					this.props.onLogout();
				}
			if (!this.state.loaded) {
				this.setState({ loaded: true });
			}
		});
	}
	styles = {
		app: {
			fontFamily: [
				'HelveticaNeue-Light',
				'Helvetica Neue Light',
				'Helvetica Neue',
				'Helvetica',
				'Arial',
				'Lucida Grande',
				'sans-serif'
			],
			fontWeight: 300
		}
	};
	render() {
		return (
			<div style={this.styles.app} className="app">
				{ this.state.loaded ? this.props.children : null}
			</div>
		);
	}
}

export default connect(state => ({ next: state.auth.next, user: state.auth.user }), dispatch => ({
	onLogin: user => {
		dispatch(login(user));
	},
	onLogout: () => {
		dispatch(logout());
	},
	onRedirect: (path) => {
		dispatch(push(path));
	},
	onResetNext: () => {
		dispatch(resetNext());
	}
}))(App);
