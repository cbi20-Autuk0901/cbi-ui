import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidationService } from '../../../services/custom-validation/custom-validation.service';
import { UserService } from '../../../services/user/user.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  profileSubmitted: boolean;
  passwordSubmitted: boolean;
  token: string;
  isValidSession: boolean;
  isLoading: boolean;

  constructor(
    private userS: UserService,
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading = true;
    this.profileForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userEmail: [
          'hdsjfhdjfh@hjh.com',
          [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')],
        ],
        companyName: ['sjdsjkdhjk', Validators.required],
        location: ['', Validators.required],
        invoiceCompanyName: ['', Validators.required],
        businessRegistrationNo: ['', Validators.required],
        invoiceEmail: [
          '',
          [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')],
        ],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        businessAddress: ['', Validators.required],
      },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
    this.passwordForm = this.fb.group(
      {
        oldPassword: [
          '',
          [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')],
        ],
        newPassword: [
          '',
          [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')],
        ],
        confirmNewPassword: ['', Validators.required],
      },
      {
        validator: this.customValidator.MatchPassword('newPassword', 'confirmNewPassword'),
      }
    );
  }

  ngOnInit(): void {}

  get profileControls() {
    return this.profileForm.controls;
  }

  get passwordControls() {
    return this.passwordForm.controls;
  }

  updateProfile = () => {
    this.profileSubmitted = true;
    if (this.profileForm.valid) {
      const payload = this.profileForm.value;
      this.userS.registerUser(payload).subscribe((e) => {
        this.utils.showMessage('c', 'success', 'Success', 'Registered Successfully');
      });
    }
  };

  submitPassword = () => {
    this.passwordSubmitted = true;
    if (this.passwordForm.valid) {
      const payload = this.passwordForm.value;
      this.userS.registerUser(payload).subscribe((e) => {
        this.utils.showMessage('c', 'success', 'Success', 'Registered Successfully');
      });
    }
  };
}
