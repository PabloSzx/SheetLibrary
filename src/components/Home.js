import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './auth/Login';

class Home extends Component {
	render() {
		return (
			<div>
				<strong><h1 className="text-center">Bienvenido a SheetLibrary</h1></strong>
				<h2 className="text-center">Puedes registrarte de forma rápida, fácil y gratuita</h2>
				<Login />
				<hr/>
				<h6 style={{'text-align':'center'}}>Si desea contactarse con el desarrollador, favor de mandar un correo a admin@pablosz.me</h6>
			</div>
		)
	}
}

export default connect()(Home);
