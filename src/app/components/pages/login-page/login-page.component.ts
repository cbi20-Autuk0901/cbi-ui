import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DatastoreService } from 'src/app/services/data-store/data-store.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private ds: DatastoreService
  ) {}

  ngOnInit(): void {}

  loginUser() {
    this.userService.authenticateUser(this.loginForm.value).subscribe(
      (data) => {
        this.ds.setStore('isLoggedin', true);
        this.ds.setStore('userData', data);
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        if (err.status === 403) {
          alert('Invalid Credentials');
        }
        if (err.status === 401) {
          alert("User doesn't exist");
        }
      }
    );
  }
}
