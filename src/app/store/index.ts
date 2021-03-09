import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './hydration/hydration.reducer';
import { Login } from '../models/login.model';
import { Dashboard } from '../models/dashboard.model';
import { loginReducer } from './login/login.reducer';
import { dashboardReducer } from './dashboard/dashboard.reducer';
import { AppState } from './app.state';

export const reducers: ActionReducerMap<AppState> = {
  login: loginReducer,
  dashboard: dashboardReducer,
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
