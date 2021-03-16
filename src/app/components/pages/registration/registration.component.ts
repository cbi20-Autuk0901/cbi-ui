import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  UserService
} from 'src/app/services/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private userS: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      userEmail: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      confirmPassword: this.fb.control('', Validators.required),
      companyName: this.fb.control('', Validators.required),
      location: this.fb.control('', Validators.required),
      userRole: this.fb.control('', Validators.required),
      invoiceCompanyName: this.fb.control('', Validators.required),
      businessRegistrationNo: this.fb.control('', Validators.required),
      invoiceEmail: this.fb.control('', Validators.required),
      phoneNumber: this.fb.control('', Validators.required),
      businessAddress: this.fb.control('', Validators.required),
    });
  }

  registerUser = () => {
    const payload = this.registerForm.value;
    this.userS.registerUser(payload)
      .subscribe((e) => {
        console.log(e);
      });

  }

}
