import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.route.params.subscribe((rt) => {
      this.token = rt.token;
      const headers = {
        token: this.token,
      };
      this.userS.validateSession(headers).subscribe(
        (res) => {
          this.registerForm = this.fb.group(
            {
              firstName: ['', Validators.required],
              lastName: ['', Validators.required],
              userEmail: [
                res['userEmail'],
                [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')],
              ],
              password: [
                '',
                [
                  Validators.required,
                  Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
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
                [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')],
              ],
              phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
              businessAddress: ['', Validators.required],
              jobTitle: '',
            },
            {
              validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
            }
          );
          this.isValidSession = true;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
        }
      );
    });
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
        this.utils.showMessage('c', 'success', 'Success', 'Registered Successfully');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      });
    }
  };
}
