import React, { Component } from 'react';
import { connect } from 'react-redux'
import { signInUser } from '../../actions';
import { Field, reduxForm } from 'redux-form';

class SignIn extends Component {
	renderField(field) {
		const { meta } = field;
		const { touched, error } = meta;
		const divClassName = `form-group ${touched} && ${error} ? 'has-danger' : ''`;
		return (
			<div className={ divClassName }>
				<label>{ field.label }</label>
				<input 
					className="form-control"
					type={ field.type || "text" }
					{ ...field.input } 
				/>
				{ touched ? error : '' } 
			</div> 
		);
	}

	onSubmit = ({ email, password }) => {
		this.props.signInUser({ email, password });
	}

	renderAlert() {
		const { errorMsg } = this.props;
		if (errorMsg) {
			return (
				<div className="alert alert-danger">
					{ errorMsg }
				</div>
			)
		}
	}

	render() {
		// ReduxForm provides this.props with handleSubmit
		// handleSubmit(callback) runs the values through
		// validate(). If errors = {}, the callback is invoked.
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<Field 
					className="form-group" 
					label="Email"
					name="email"
					type="text"
					component={ this.renderField }
				/>
				<Field 
					className="form-group"
					label="Password" 
					name="password"
					type="password"
					component={ this.renderField }
				/>
				{ this.renderAlert() }
				<button 
					className="btn btn-primary"
					action="submit">
						Sign In 
				</button>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};
	if (!values.email) {
		errors.email = "Enter an email!";
	} 
	if (!errors.password) {
		errors.password = "Enter a password!";
	}
	return errors;
}

const reduxFormOptions = {
	form: 'signin',
	fields: ['email', 'password']
}

function mapStateToProps({ auth }) {
	return {
		errorMsg: auth.get('error')
	}
}

export default reduxForm(reduxFormOptions)(
	connect(mapStateToProps, { signInUser })(SignIn)
);