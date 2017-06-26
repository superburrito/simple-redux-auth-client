import { Map, fromJS } from 'immutable';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types';

const initialState = Map();

export default (state = initialState, action) => {
	switch (action.type) {
		case AUTH_USER:
			return state.set('authenticated', true);
		case UNAUTH_USER:
			return state.set('authenticated', false);
		case AUTH_ERROR:
			return state.set('error', action.payload);
	}
	return state;
}