import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

class Home extends Component {
	render() {
		return (
			<div>
				<strong><h1>Home</h1></strong>
				<Link to='/login'><Button bsStyle="primary">Login</Button></Link>
				<Link to='/register'><Button bsStyle="danger">Register</Button></Link>
			</div>
		)
	}
}

export default connect()(Home);
