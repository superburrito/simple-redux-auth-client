import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { signOutUser } from '../actions';

class Header extends Component {

	renderLinks() {
		const { authenticated, actions } = this.props;
		if (authenticated) {
			return (
				<li 
					className="nav-item" 
					onClick={ (ev) => actions.signOutUser() }
				>
					<Link to="/signout" className="nav-link">Sign Out</Link>
				</li>
			)
		} else {
			return [
				<li className="nav-item" key="signInButton">
					<Link to="/signin" className="nav-link">Sign In</Link>
				</li>,
				<li className="nav-item" key="signUpButton">
					<Link to="/signup" className="nav-link">Sign Up</Link>
				</li>				
			]
		}
	}

	render() {
		const { actions, authenticated } = this.props;
		return (
			<nav className="navbar navbar-light">
				<Link 
					className="navbar-brand"
					to="/"
				>
					Redux Auth
				</Link>
				<ul className="nav navbar-nav">
					{ this.renderLinks() }
				</ul>
			</nav>
		);
	}
}

function mapStateToProps ({ auth }, ownProps) {
  return {
  	authenticated: auth.get('authenticated')
  }
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({
			signOutUser
		}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);