import { createAction, props } from '@ngrx/store';
import { Login } from 'src/app/models/login.model';

export const loginSuccess = createAction('[Login] Success', props<Login>());
export const logoutUser = createAction('[Login] logoutUser');
