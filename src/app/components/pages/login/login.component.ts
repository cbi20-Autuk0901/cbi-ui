import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
