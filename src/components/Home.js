import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './auth/Login';
import Logo from '../imgs/logo-inverted.png';

class Home extends Component {
	render() {
		return (
			<div className="formBody">
				<strong><h1 className="text-center">Bienvenido a</h1></strong>
				<img src={Logo} className="logo center-block" alt="SheetLibrary" />
				<h2 className="text-center">Puedes registrarte de forma rápida, fácil y gratuita</h2>
				<Login />
				<hr/>
				<h6 className="text-center">Si desea contactarse con el desarrollador, favor de mandar un correo a admin@pablosz.me</h6>
			</div>
		)
	}
}

export default connect()(Home);
