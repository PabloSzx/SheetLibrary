import React from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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

	componentWillMount() {
		this.setState({
			facebookButton : "https://firebasestorage.googleapis.com/v0/b/sheetlibrary-bdca1.appspot.com/o/facebookButton.png?alt=media&token=8f82c6a4-a2e6-463a-8e3e-c3f1f151efeb",
			googleButton : "https://firebasestorage.googleapis.com/v0/b/sheetlibrary-bdca1.appspot.com/o/googleButton.png?alt=media&token=84f6805a-10d5-4d0c-ae7d-61a6a76f25f6",
			twitterButton : "https://firebasestorage.googleapis.com/v0/b/sheetlibrary-bdca1.appspot.com/o/twitterButton.png?alt=media&token=2f05728d-5e7d-42e4-ae3b-f6fb2d8e05d8",
			githubButton : "https://firebasestorage.googleapis.com/v0/b/sheetlibrary-bdca1.appspot.com/o/githubButton.png?alt=media&token=51e2b8b7-a90d-46bf-8b6f-4e836e5a6bcd"
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
				<img src={this.state.facebookButton} alt="Sign in with Facebook" className='loginButton btn' onClick={()=> this.fblogin()}/>
				<br/>
				<img src={this.state.googleButton} alt="Sign in with Google" className='loginButton btn' onClick={()=> this.googlelogin()}/>
				<br/>
				<img src={this.state.twitterButton} alt="Sign in with Twitter" className='loginButton btn' onClick={()=> this.twitterlogin()}/>
				<br/>
				<img src={this.state.githubButton} alt="Sign in with GitHub" className='loginButton btn' onClick={()=> this.githublogin()}/>

				{/* <button className='btn btn-primary' onClick={()=> this.fblogin()}>Facebook Login</button> */}
				<br/>
				<br/>
				<Link to='/'><div className="btn btn-warning">Cancel</div></Link>
			</div>
		);
	}
}

export default connect()(Login);
