import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { startCase, camelCase } from 'lodash-es';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss'],
})
export class AdminManagementComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef;

  pgData: object;
  userData: object;
  usrStats: object;
  isLoading: boolean;
  currentView: string;
  usrList: Array<object>;
  enableAddUsr: boolean;
  clonedUsrs: { [s: string]: any } = {};

  constructor(private ds: DatastoreService, private utils: UtilsService) {
    this.isLoading = true;
    this.enableAddUsr = false;
    this.userData = this.utils.getStore('userData');
  }

  ngOnInit(): void {
    const headers: object = { userEmail: this.userData['userEmail'] };
    this.ds.getAdminManagement(headers).subscribe((res) => {
      this.pgData = res;
      this.usrStats = res['userStats'];
      this.changeView('admin');
      this.isLoading = false;
    });
  }

  toggleEnableAdd = () => {
    setTimeout(() => {
      this.enableAddUsr = true;
    });
  };

  changeView = (name) => {
    let tempList = [];
    this.currentView = name;
    this.enableAddUsr = false;

    if (name === 'admin') tempList = this.pgData['admins'];
    if (name === 'reviewer') tempList = this.pgData['reviewers'];
    if (name === 'issuer') {
      tempList = this.pgData['issuers'].map((e) => {
        e.userRole = startCase(e.userRole);
        return e;
      });
    }

    document.querySelectorAll<HTMLElement>('.cancelEdit').forEach((node) => node.click());

    this.usrList = this.utils.addIndex(tempList);
  };

  onRowEditInit(tmpUsr: any) {
    this.clonedUsrs[tmpUsr.no] = { ...tmpUsr };
  }

  onRowEditSave(tmpUsr: any, index: number) {
    this.usrList[index] = this.clonedUsrs[tmpUsr.no];
    delete this.clonedUsrs[tmpUsr.no];
  }

  onRowEditCancel(tmpUsr: any, index: number) {
    this.usrList[index] = this.clonedUsrs[tmpUsr.no];
    delete this.clonedUsrs[tmpUsr.no];
  }

  addUser = (form, role) => {
    const formData = form.value;
    if (form.valid) {
      const payload = {
        ...formData,
        adminEmail: this.userData['userEmail'],
        companyName: '',
        userRole: role,
        invoiceCompanyName: '',
        businessRegistrationNo: '',
        businessAddress: '',
        invoiceEmail: '',
        phoneNumber: '',
        password: '',
      };

      this.ds.adminAddUser(payload).subscribe(
        (res) => {
          this.utils.showMessage('success', 'Success', 'User Added Successfully');
          this.pgData = res;
          this.usrStats = res['userStats'];
          this.enableAddUsr = false;
          this.changeView(this.currentView);
          form.reset();
        },
        (error) => {
          this.utils.showMessage('error', 'Error', 'Unable to Add User. Please try again');
        }
      );
    } else {
      this.utils.showMessage('error', 'Error', 'All fields are mandatory');
    }
  };

  updateUser = (usrData: any, index: number) => {
    usrData['userRole'] = camelCase(usrData['userRole']);

    const payload = {
      ...usrData,
      adminEmail: this.userData['userEmail'],
    };

    this.ds.adminUpdateUser(payload).subscribe(
      (res) => {
        this.utils.showMessage('success', 'Success', 'User Updated Successfully');
        this.pgData = res;
        this.usrStats = res['userStats'];
        this.enableAddUsr = false;
        this.changeView(this.currentView);
      },
      (error) => {
        this.utils.showMessage('error', 'Error', 'Unable to Update User. Please try again');
      }
    );
  };

  removeUser = (usr) => {
    const payload = {
      adminEmail: this.userData['userEmail'],
      userEmail: usr.userEmail,
    };

    this.ds.adminRemoveUser(payload).subscribe(
      (res) => {
        this.utils.showMessage('success', 'Success', 'User Removed Successfully');
        this.pgData = res;
        this.usrStats = res['userStats'];
        this.enableAddUsr = false;
        this.changeView(this.currentView);
      },
      (error) => {
        this.utils.showMessage('error', 'Error', 'Unable to Remove User. Please try again');
      }
    );
  };

  resetPassword = (email) => {
    const payload = {
      userEmail: email,
    };
    if (email) {
      this.ds.forgotPassword(payload).subscribe(
        (res) => {
          this.utils.showMessage('success', 'Success', 'Password Reset successful. New password sent to User Mail');
        },
        (error) => {
          this.utils.showMessage('error', 'Error', 'Unable to Reset Password. Please try again');
        }
      );
    }
  };

  inviteIssuer = (form) => {
    const formData = form.value;
    const payload = {
      adminEmail: this.userData['userEmail'],
      userEmail: formData.inviteeEmail,
    };

    this.closeModal.nativeElement.click();

    this.ds.adminInviteIssuer(payload).subscribe(
      (res) => {
        this.utils.showMessage('success', 'Success', 'Registration Link is Successfully Sent');

        form.reset();
      },
      (error) => {
        if (error.status === 409) {
          this.utils.showMessage('error', 'Error', 'Registration Link is Already sent to this Email');
        } else {
          this.utils.showMessage('error', 'Error', 'Unable to Send Registration Link. Please try again');
        }
      }
    );
  };
}
