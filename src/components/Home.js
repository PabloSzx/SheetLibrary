import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './auth/Login';

class Home extends Component {
	render() {
		return (
			<div>
				<strong><h1>Bienvenido a SheetLibrary</h1></strong>
				<h2>Puedes registrarte de forma rápida, fácil y gratuita</h2>
				<Login />
				<h6>Si desea contactarse con el desarrollador, favor de mandar un correo a admin@pablosz.me</h6>
			</div>
		)
	}
}

export default connect()(Home);
