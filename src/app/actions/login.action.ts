import { createAction, props } from '@ngrx/store';
import { Login } from './../models/login.model';

export const loginSuccess = createAction('[Login] Success', props<Login>());
