import { createReducer, on } from '@ngrx/store';
import { loginSuccess } from './../actions/login.action';
import { Login } from './../models/login.model';

export const initialState: Login = {
  email: '',
  userToken: '',
};

const _loginReducer = createReducer(
  initialState,
  on(loginSuccess, (state, payload) => (state = payload))
);

export function loginReducer(state, action) {
  return _loginReducer(state, action);
}
