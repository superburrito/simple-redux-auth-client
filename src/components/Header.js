import React, { Component } from 'react';
import { connect } from 'react-redux';
import { } from '../actions';

class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-light">
				<ul className="nav navbar-nav">
					<li className="nav-item">Sign In</li>
					<li className="nav-item">Sign Up</li>
				</ul>
			</nav>
		);
	}
}

/*function mapStateToProps (state, ownProps) {
  return {
  	state
  }
}*/

export default connect()(Header);