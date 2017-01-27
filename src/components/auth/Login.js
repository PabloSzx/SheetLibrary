import React from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import facebookButton from '../../img/facebookButton.png';
import googleButton from '../../img/googleButton.png';
import twitterButton from '../../img/twitterButton.png';
import githubButton from '../../img/githubButton.png';

class Login extends React.Component {
	state = {
		email: '',
		password: '',
		error: null
	};

	handleSubmit(event) {
		event.preventDefault();
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
			.catch((error) => {
				this.setState({ error: error });
			});
	}

	onInputChange(name, event) {
		var change = {};
		change[name] = event.target.value;
		this.setState(change);
	}

	fblogin() {
		firebase.auth().signOut();
		var provider = new firebase.auth.FacebookAuthProvider();

		firebase.auth().signInWithPopup(provider).then(function(result) {
		  // var token = result.credential.accessToken;
			// var user = result.user;
		  // this.setState({ 'asd' : user });
		}).catch(function(error) {
		  // var errorCode = error.code;
		  // var errorMessage = error.message;
		  // var email = error.email;
		  // var credential = error.credential;
		});

		//firebase.auth().signInWithRedirect(provider);
	}

	googlelogin() {
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result) {
			// var token = result.credential.accessToken;
			// var user = result.user;
		}).catch(function(error) {
			// var errorCode = error.code;
			// var errorMessage = error.message;
			// var email = error.email;
			// var credential = error.credential;
		});
	}

	twitterlogin() {
		var provider = new firebase.auth.TwitterAuthProvider();

		firebase.auth().signInWithPopup(provider).then(function(result) {
		  // var token = result.credential.accessToken;
		  // var secret = result.credential.secret;
		  // var user = result.user;
		}).catch(function(error) {
		  // var errorCode = error.code;
		  // var errorMessage = error.message;
		  // var email = error.email;
		  // var credential = error.credential;
});
	}

	githublogin() {
		var provider = new firebase.auth.GithubAuthProvider();

		firebase.auth().signInWithRedirect(provider).then(function(result) {
		  // var token = result.credential.accessToken;
		  // var user = result.user;
			}).catch(function(error) {
			  // var errorCode = error.code;
			  // var errorMessage = error.message;
			  // var email = error.email;
			  // var credential = error.credential;
		});
	}
	render() {
		var errors = this.state.error ? <p> {this.state.error} </p> : '';
		return (
			<div>
				<h1><strong>Login</strong></h1>
				<form className="hidden" onSubmit={this.handleSubmit.bind(this)}>
					<label>Email <input type='email'
					                    placeholder='Email'
					                    value={this.state.email}
					                    onChange={this.onInputChange.bind(this, 'email')}
					/></label>
					<br/>
					<label>Password <input type='password'
					                       placeholder='Password'
					                       value={this.state.password}
					                       onChange={this.onInputChange.bind(this, 'password')}
					/></label>

					{errors}
					<br/>
					<button className='btn btn-primary' type='submit'>Email Login</button>
				</form>
				<img src={facebookButton} alt="Sign in with Facebook" className='loginButton btn' onClick={()=> this.fblogin()}/>
				<br/>
				<img src={googleButton} alt="Sign in with Google" className='loginButton btn' onClick={()=> this.googlelogin()}/>
				<br/>
				<img src={twitterButton} alt="Sign in with Twitter" className='loginButton btn' onClick={()=> this.twitterlogin()}/>
				<br/>
				<img src={githubButton} alt="Sign in with GitHub" className='loginButton btn' onClick={()=> this.githublogin()}/>

				{/* <button className='btn btn-primary' onClick={()=> this.fblogin()}>Facebook Login</button> */}
				<br/>
				<br/>
				<Link to='/'><div className="btn btn-warning">Cancel</div></Link>
			</div>
		);
	}
}

export default connect()(Login);
