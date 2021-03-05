import {
  Component,
  OnInit
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  Login
} from 'src/app/models/login.model';
import {
  Store
} from '@ngrx/store';
import {
  AppState
} from 'src/app/app.state';
import {
  loginSuccess
} from './../../../actions/login.action';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  user: Login;
  constructor(private store: Store < AppState > ) {
    store.select('login').subscribe((e) => {
      this.user = e;
    });
  }
  ngOnInit(): void {}

  test = (val: string) => {
    this.store.dispatch(loginSuccess({
      email: val,
      userToken: ''
    }));
  };
}
