import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../../../app.state';
import { loginSuccess } from './../../../actions/login.action';
import { Login } from './../../../models/login.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  userToken: Observable<Login>;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.userToken = store.select('login');
  }

  ngOnInit(): void {}

  authenticateUser() {
    this.userService.loginUser(this.loginForm.value).subscribe(
      (data) => {
        const payload: Login = {
          email: data.user_first_name,
          userToken: data.user_first_name,
        };
        this.store.dispatch(loginSuccess(payload));
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
}
