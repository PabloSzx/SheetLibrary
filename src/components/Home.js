import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './auth/Login';
import Logo from '../imgs/logo-inverted.png';
import { selectLanguage } from '../actions/index';

class Home extends Component {
	render() {
		const { contact, register, welcome, language, spanish, english } = this.props.language;

		return (
			<div className="formBody">
				<strong><h1 className="text-center">{welcome}</h1></strong>
				<img src={Logo} className="logo center-block" alt="SheetLibrary" />
				<h2 className="text-center">{register}</h2>
				<Login />
				<hr />
				<h5 className="text-center">
					{language}
					<strong>
						<a
							className="language"
							onClick={() => this.props.selectLanguage('spanish')}
						>
							{spanish}
						</a>
					</strong>
					/
					<strong>
						<a
							className="language"
							onClick={() => this.props.selectLanguage('english')}
						>
							{english}
						</a>
					</strong>
				</h5>
				<h6 className="text-center">{contact}</h6>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    language: state.library.language.index
  };
}

export default connect(mapStateToProps, { selectLanguage })(Home);
