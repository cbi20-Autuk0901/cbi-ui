import { createReducer, on } from '@ngrx/store';
import { Dashboard } from '../../models/dashboard.model';
import { loadedNotifications } from './dashboard.action';

export const initialState: Dashboard = {
  notifications: '',
};

export const dashboardReducer = createReducer(
  initialState,
  on(loadedNotifications, (state, payload) => (state = payload))
);
