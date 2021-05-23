import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  isValidSession: boolean;
  isLoading: boolean;
  userData: object;

  constructor(
    private userS: UserService,
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private utils: UtilsService
  ) {
    this.userData = this.utils.getStore('userData');
    this.isLoading = true;
    this.userS.getProfile(this.userData['userEmail']).subscribe(
      (res) => {
        this.profileForm = this.fb.group(
          {
            firstName: [res['firstName'] || '', Validators.required],
            lastName: [res['lastName'], Validators.required],
            userEmail: [
              res['userEmail'],
              [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')],
            ],
            companyName: [res['companyName'], Validators.required],
            location: [res['location'], Validators.required],
            invoiceCompanyName: [res['invoiceCompanyName'], Validators.required],
            businessRegistrationNo: [res['businessRegistrationNo'], Validators.required],
            invoiceEmail: [
              res['invoiceEmail'],
              [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')],
            ],
            phoneNumber: [res['phoneNumber'], [Validators.required, Validators.pattern('^[0-9]*$')]],
            businessAddress: [res['businessAddress'], Validators.required],
          },
          {
            validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
          }
        );
        this.passwordForm = this.fb.group(
          {
            password: [
              '',
              [
                Validators.required,
                Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_+-={}|]).{8,}$'),
              ],
            ],
            newPassword: [
              '',
              [
                Validators.required,
                Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_+-={}|]).{8,}$'),
              ],
            ],
            confirmNewPassword: ['', Validators.required],
          },
          {
            validator: this.customValidator.MatchPassword('newPassword', 'confirmNewPassword'),
          }
        );
        this.isLoading = false;
      },
      (err) => {}
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
      this.userS.updateProfile(payload).subscribe(
        (e) => {
          this.utils.showMessage('c', 'success', 'Success', 'Profile Updated');
        },
        (error) => {
          this.utils.showMessage('c', 'error', 'Error', 'Please try again later');
        }
      );
    }
  };

  changePassword = () => {
    this.passwordSubmitted = true;
    if (this.passwordForm.valid) {
      const formData = this.passwordForm.value;
      const payload = {
        userEmail: this.userData['userEmail'],
        oldPassword: formData['password'],
        newPassword: formData['newPassword'],
      };
      this.userS.changePassword(payload).subscribe(
        (e) => {
          this.passwordForm.reset();
          this.passwordSubmitted = false;
          this.utils.showMessage('c', 'success', 'Success', 'Password Changed');
        },
        (e) => {
          if (e.status === 403) {
            this.utils.showMessage('c', 'error', 'Error', 'Wrong Password');
          } else {
            this.utils.showMessage('c', 'error', 'Error', 'Please try again later');
          }
        }
      );
    }
  };
}
