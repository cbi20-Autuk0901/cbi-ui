import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
  rsData: any;
  rsOptions: any;
  diData: any;
  diOptions: any;
  icData: any;
  icOptions: any;
  ficData: any;
  ficOptions: any;
  plugin: any;
  monFilterOpt: Array<object>;
  filterSel: number;

  constructor(private ds: DatastoreService, private utils: UtilsService) {
    this.isLoading = true;
    this.dData = { ...this.utils.getStore('userData') };
    this.plugin = ChartDataLabels;
    this.monFilterOpt = [
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
      this.dData = data['dashboardStats'][0];
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

    this.rsOptions = {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            display: false,
            ticks: {
              fontColor: '#ffffff',
              fontSize: 10,
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
              fontColor: '#ffffff',
              fontSize: 12,
              fontStyle: 'bold',
              mirror: true,
              labelOffset: -11,
              z: 50,
            },
            gridLines: {
              display: false,
              color: 'rgba(0,0,0,0)',
            },
          },
        ],
      },
      plugins: {
        datalabels: {
          formatter: function (value, context) {
            return context.dataset.data[context.dataIndex];
          },
          borderRadius: 30,
          color: '#000000',
          align: 'end',
          anchor: 'end',
          offset: -20,
          clip: true,
          font: {
            size: '10',
            weight: '600',
          },
        },
      },
    };

    this.icOptions = {
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
        display: true,
        position: 'bottom',
      },
    };
  }

  processCharts = (data) => {
    const statData = data['dashboardStats'][0];
    const diLabels = ['Bonds', 'Loans', 'Deposit', 'Others'];
    const diValues = [
      statData['bond'],
      statData['loan'],
      statData['deposit'],
      statData['others'],
    ];
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

    const rsLabels = [];
    const rsValues = [];

    data['reviewerStats'].forEach((el) => {
      rsLabels.push(Object.keys(el)[0]);
      rsValues.push(Object.values(el)[0]);
    });

    this.rsData = {
      labels: rsLabels,
      datasets: [
        {
          minBarLength: 25,
          maxBarThickness: 13,
          backgroundColor: '#ffffff',
          data: rsValues,
          borderRadius: 50,
        },
      ],
    };

    this.filterMonths();

    this.ficData = {
      labels: ['Manual', 'Auto'],
      datasets: [
        {
          data: [300, 50],
          backgroundColor: ['#563666', '#f7a931'],
          hoverBackgroundColor: ['#563666', '#f7a931'],
        },
      ],
    };
  };

  filterMonths = () => {
    let icLabel = [];
    let icData1 = [];
    let icData2 = [];
    const sortMon = this.pageData['monthlyStats'].sort(
      (x, y) => x.index - y.index
    );
    for (let i = 0; i < this.filterSel; i++) {
      icLabel.push(sortMon[i].label);
      icData1.push(sortMon[i].manualApproval);
      icData2.push(sortMon[i].autoApproval);
    }
    this.icData = {
      labels: icLabel,
      datasets: [
        {
          label: 'Manual Approved',
          backgroundColor: '#563666',
          data: icData1,
          minBarLength: 2,
        },
        {
          label: 'Auto Approved',
          backgroundColor: '#f7a931',
          data: icData2,
          minBarLength: 2,
        },
      ],
    };
  };
}
