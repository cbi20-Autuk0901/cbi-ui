import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from './../../../services/utils/utils.service';

@Component({
  selector: 'app-reviewer-dashboard',
  templateUrl: './reviewer-dashboard.component.html',
  styleUrls: ['./reviewer-dashboard.component.scss'],
})
export class ReviewerDashboardComponent implements OnInit {
  isLoading: boolean;
  ctData: any;
  uwData: any;
  ctOptions: any;
  uwOptions: any;
  diData: any;
  diOptions: any;
  userData: any;
  filterBy: string;
  assignedCertifications: Array<object>;
  dStats: object;

  constructor(private utils: UtilsService, private ds: DatastoreService) {
    this.isLoading = true;
    this.userData = this.utils.getStore('userData');
    this.filterBy = '';
  }

  ngOnInit(): void {
    this.diOptions = {
      title: {
        display: true,
        text: 'Debt Instruments',
        fontSize: 14,
        fontColor: '#000000',
        align: 'start',
      },
      legend: {
        display: false,
      },
    };

    this.ctOptions = {
      title: {
        display: true,
        text: 'Certification Type',
        fontSize: 14,
        fontColor: '#000000',
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: '#000000',
              fontSize: 8,
              fontStyle: 'bold',
            },
            gridLines: {
              color: 'rgba(0,0,0,0)',
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              beginAtZero: true,
              fontSize: 8,
              stepSize: 50,
            },
            gridLines: {
              color: '#c8c9cd',
            },
          },
        ],
      },
    };

    this.uwOptions = {
      title: {
        display: true,
        text: 'Underwriter',
        fontSize: 14,
        fontColor: '#000000',
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: '#000000',
              fontSize: 8,
              fontStyle: 'bold',
            },
            gridLines: {
              color: 'rgba(0,0,0,0)',
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              beginAtZero: true,
              fontSize: 8,
              stepSize: 50,
            },
            gridLines: {
              color: '#c8c9cd',
            },
          },
        ],
      },
    };

    this.loadDashboard();
  }

  loadDashboard = () => {
    let filterValue = '';
    if (this.filterBy) {
      const now = moment();
      const selRange: any = this.filterBy.split(' ');
      filterValue = now.subtract(selRange[0], selRange[1]).format();
    }
    const payload = {
      userEmail: this.userData['userEmail'],
      filterBy: filterValue,
    };
    this.ds.getDashboard(payload, 'reviewerDashboard').subscribe((res) => {
      this.dStats = res.dashboardStats;
      this.assignedCertifications = this.processCertData(
        res.assignedCertifications
      );
      this.processCharts(res['chartData']);

      this.isLoading = false;
    });
  };

  processCertData = (data: Array<object>): Array<object> => {
    const res = data.map((e) => {
      const apDate = moment(e['applicationDate']);
      const asDate = moment(e['assignedDate']);
      const diffDays = moment.duration(asDate.diff(apDate)).asDays();
      if (diffDays < 11) {
        e['severity'] = 'success';
      } else if (diffDays >= 11 && diffDays < 17) {
        e['severity'] = 'warning';
      } else if (diffDays >= 17) {
        e['severity'] = 'danger';
      }
      return e;
    });

    return res;
  };

  processCharts = (data: object) => {
    const ctLabels = data['certificationType'].map((e) => {
      switch (e.name) {
        case 'preIssuance':
          return 'Pre-Issuance';
        case 'postIssuance':
          return 'Post-Issuance';
        default:
          return 'Bond Redemption';
      }
    });
    const ctValues = data['certificationType'].map((e) => e.value);
    this.ctData = {
      labels: ctLabels,
      datasets: [
        {
          minBarLength: 2,
          label: 'Total',
          backgroundColor: ['#563666', '#e7367d', '#f7a931'],
          data: ctValues,
        },
      ],
    };

    const diLabels = data['debtInstruments'].map((e) => e.name);
    const diValues = data['debtInstruments'].map((e) => e.value);
    this.diData = {
      labels: diLabels,
      datasets: [
        {
          minBarLength: 2,
          borderWidth: 5,
          data: diValues,
          backgroundColor: ['#3f344c', '#e53f65', '#ec6929', '#f5c548'],
          hoverBackgroundColor: ['#3f344c', '#e53f65', '#ec6929', '#f5c548'],
        },
      ],
    };

    let uwList = {
      labels: [],
      values: [],
    };
    data['underwriter'].forEach((e) => {
      if (e.value > 0) {
        uwList.labels.push(e.name);
        uwList.values.push(e.value);
      }
    });
    this.uwData = {
      labels: uwList.labels,
      datasets: [
        {
          label: 'Total',
          backgroundColor: [
            '#563666',
            '#e7367d',
            '#f7a931',
            '#ec6927',
            '#4eb4be',
            '#92d050',
          ],
          data: uwList.values,
        },
      ],
    };
  };
}
