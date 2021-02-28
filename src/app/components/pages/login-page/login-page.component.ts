import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  token: Observable<string>;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  authenticateUser() {
    this.userService.loginUser(this.loginForm.value).subscribe(
      (data) => {
        console.log('success', data);
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
}
