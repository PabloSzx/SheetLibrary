import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

class Home extends Component {
	render() {
		return (
			<div>
				<strong><h1>Bienvenido a SheetLibrary</h1></strong>
				<h2>Puedes registrarte de forma rápida, fácil y gratuita</h2>
				<Link to='/login'><Button bsStyle="primary">Login</Button></Link>
				<Link className="hidden" to='/register'><Button bsStyle="danger">Register</Button></Link>
				<h6>Si desea contactarse con el desarrollador, favor de mandar un correo a admin@pablosz.me</h6>
			</div>
		)
	}
}

export default connect()(Home);
