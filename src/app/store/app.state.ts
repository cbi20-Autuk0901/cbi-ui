import { Login } from '../models/login.model';
import { Dashboard } from 'src/app/models/dashboard.model';

export interface AppState {
  login: Login;
  dashboard: Dashboard;
}
