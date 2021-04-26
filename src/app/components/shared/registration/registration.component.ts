import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from '../../../services/custom-validation/custom-validation.service';
import { UserService } from '../../../services/user/user.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean;

  constructor(
    private userS: UserService,
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private utils: UtilsService
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userEmail: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        companyName: ['', Validators.required],
        location: ['', Validators.required],
        userRole: ['', Validators.required],
        invoiceCompanyName: ['', Validators.required],
        businessRegistrationNo: ['', Validators.required],
        invoiceEmail: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]*$')],
        ],
        businessAddress: ['', Validators.required],
        jobTitle: '',
      },
      {
        validator: this.customValidator.MatchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  ngOnInit(): void {}

  get controls() {
    return this.registerForm.controls;
  }

  registerUser = () => {
    this.submitted = true;
    if (this.registerForm.valid) {
      const payload = this.registerForm.value;
      this.userS.registerUser(payload).subscribe((e) => {
        this.utils.showMessage('success', 'Success', 'Registered Successfully');
      });
    }
  };
}
