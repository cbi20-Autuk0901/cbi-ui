import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { CustomValidationService } from 'src/app/services/custom-validation/custom-validation.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean;

  constructor (private userS: UserService, private fb: FormBuilder, private customValidator: CustomValidationService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.pattern('/^[^\s@]+@[^\s@]+$/')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      confirmPassword: ['', Validators.required],
      companyName: ['', Validators.required],
      location: ['', Validators.required],
      userRole: ['', Validators.required],
      invoiceCompanyName: ['', Validators.required],
      businessRegistrationNo: ['', Validators.required],
      invoiceEmail: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      businessAddress: ['', Validators.required],
    }, {
      validator: this.customValidator.MatchPassword('password', 'confirmPassword')
    });
  }

  ngOnInit (): void {


  }

  get controls () {
    return this.registerForm.controls;
  }

  registerUser = () => {
    this.submitted = true;
    if (this.registerForm.valid) {
      const payload = this.registerForm.value;
      this.userS.registerUser(payload)
        .subscribe((e) => {
          alert('Registered Successfully');
        });

    }

  };

}
