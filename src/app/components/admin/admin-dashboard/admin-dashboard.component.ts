import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  dData: object;
  pageData: object;
  isLoading: boolean;
  csData: any;
  csOptions: any;
  diData: any;
  diOptions: any;
  icData: any;
  icOptions: any;
  ficData: any;
  ficOptions: any;
  rsData: Array<object>;
  plugin: any;
  monFilterOpt: Array<object>;
  filterSel: number;

  constructor(private ds: DatastoreService, private utils: UtilsService) {
    this.isLoading = true;
    this.dData = { ...this.utils.getStore('userData') };
    this.monFilterOpt = [
      { name: '1 Month', code: '1' },
      { name: '3 Months', code: '3' },
      { name: '6 Months', code: '6' },
      { name: '9 Months', code: '9' },
      { name: '1 Year', code: '12' },
    ];
    this.filterSel = 12;
  }
  ngOnInit(): void {
    const headers = {
      userEmail: this.dData['userEmail'],
    };

    this.ds.getDashboard(headers, 'adminDashboard').subscribe((data) => {
      this.pageData = data;
      this.dData = data['dashboardStats'];
      this.processCharts(data);
      this.isLoading = false;
    });

    this.csOptions = {
      legend: {
        display: true,
        position: 'right',
      },
    };

    this.diOptions = {
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
              display: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              display: false,
            },
            gridLines: {
              drawBorder: false,
              color: 'rgba(0,0,0,0)',
            },
          },
        ],
      },
    };

    this.icOptions = {
      legend: {
        display: false,
      },
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: true,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'rgba(0,0,0,0)',
              display: false,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              fontColor: '#000000',
              beginAtZero: true,
              fontSize: 8,
            },
            gridLines: {
              display: true,
              borderDash: [6],
            },
          },
        ],
      },
    };

    this.ficOptions = {
      cutoutPercentage: 85,
      aspectRatio: 1,
      animation: { animateRotate: true, animateScale: true },
      legend: {
        display: false,
        position: 'bottom',
      },
    };
  }

  processCharts = (data) => {
    const statData = data['dashboardStats'];
    const diLabels = ['Bonds', 'Loans', 'Deposit', 'Others'];
    const diValues = [statData['bond'], statData['loan'], statData['deposit'], statData['others']];
    this.diData = {
      labels: diLabels,
      datasets: [
        {
          minBarLength: 2,
          label: 'Total',
          backgroundColor: ['#563666', '#e7367d', '#f7a931'],
          data: diValues,
        },
      ],
    };

    const csLabels = ['Low', 'Medium', 'High'];
    const csValues = [statData['low'], statData['medium'], statData['high']];
    this.csData = {
      labels: csLabels,
      datasets: [
        {
          minBarLength: 2,
          borderWidth: 5,
          data: csValues,
          backgroundColor: ['#689F38', '#f4ac34', '#D32F2F'],
          hoverBackgroundColor: ['#689F38', '#f4ac34', '#D32F2F'],
        },
      ],
    };

    this.rsData = data['reviewerStats'];

    this.loadIncomingCertifications();
  };

  loadIncomingCertifications = () => {
    let icLabel = [];
    let icData1 = [];
    let icData2 = [];
    this.dData['mApprovedTotal'] = 0;
    this.dData['aApprovedTotal'] = 0;

    const sortMon = this.pageData['monthlyStats'].sort((x, y) => x.index - y.index);
    for (let i = 0; i < this.filterSel; i++) {
      this.dData['mApprovedTotal'] = this.dData['mApprovedTotal'] + sortMon[i].manualApproval;
      this.dData['aApprovedTotal'] = this.dData['aApprovedTotal'] + sortMon[i].autoApproval;
      icLabel.push(sortMon[i].label);
      icData1.push(sortMon[i].manualApproval);
      icData2.push(sortMon[i].autoApproval);
    }
    this.icData = {
      labels: icLabel,
      datasets: [
        {
          label: 'Approved',
          backgroundColor: '#563666',
          data: icData1,
          minBarLength: 2,
        },
        /* {
          label: 'Auto Approved',
          backgroundColor: '#f7a931',
          data: icData2,
          minBarLength: 2,
        }, */
      ],
    };
    this.ficData = {
      labels: ['Approved' /* , 'Auto' */],
      datasets: [
        {
          data: [this.dData['mApprovedTotal'] /* , this.dData['aApprovedTotal'] */],
          backgroundColor: ['#689F38', '#D32F2F'],
          hoverBackgroundColor: ['#689F38', '#D32F2F'],
        },
      ],
    };
  };
}
