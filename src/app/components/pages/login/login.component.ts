import {Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {DataServiceService} from '../../../services/data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
      username: '',
      password: ''
  });

  
  constructor(private dataService: DataServiceService, private formBuilder: FormBuilder) {
  }

  loginStatus: string ='';
  toasterId: string ='';

  ngOnInit(): void {
  }

  authenticateUser = (): any => {
    this.dataService.authenticateUser(this.loginForm).subscribe((data) => {
         alert('Login success')
    }, () => {
      alert('Invalid credentials')
    });

    console.log(this.loginForm);
  };

}
