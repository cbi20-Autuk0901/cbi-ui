import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from '../../../services/data-service.service';

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

  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {}

  authenticateUser = (): any => {
    this.dataService.authenticateUser(this.loginForm).subscribe(
      (data) => {
        alert('Login success');
      },
      () => {
        alert('Invalid credentials');
      }
    );
  };
}
