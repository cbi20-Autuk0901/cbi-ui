import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logoutUser } from './login.action';
import { Login } from '../../models/login.model';

export const initialState: Login = {
  firstName: '',
  lastName: '',
};

export const loginReducer = createReducer(
  initialState,
  on(loginSuccess, (state, payload) => (state = payload)),
  on(logoutUser, (state) => state)
);
