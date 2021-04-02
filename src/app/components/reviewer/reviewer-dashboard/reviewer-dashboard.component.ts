import { Component, OnInit } from '@angular/core';
import { UtilsService } from './../../../services/utils/utils.service';

@Component({
  selector: 'app-reviewer-dashboard',
  templateUrl: './reviewer-dashboard.component.html',
  styleUrls: ['./reviewer-dashboard.component.scss'],
})
export class ReviewerDashboardComponent implements OnInit {
  ctData: any;
  uwData: any;
  ctOptions: any;
  uwOptions: any;
  diData: any;
  diOptions: any;
  userData: any;

  constructor(private utils: UtilsService) {
    this.userData = this.utils.getStore('userData');
  }

  ngOnInit(): void {
    this.ctData = {
      labels: ['Pre-Issuance', 'Post-Issuance', 'Bond Redemption'],
      datasets: [
        {
          label: 'Total',
          backgroundColor: ['#563666', '#e7367d', '#f7a931'],
          data: [210, 130, 180],
        },
      ],
    };

    this.uwData = {
      labels: ['AECLU', 'BAM', 'Deloitte', 'Carbon Trust', 'EY', 'CECEP'],
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
          data: [130, 60, 160, 40, 95, 99],
        },
      ],
    };

    this.diData = {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
        {
          borderWidth: 5,
          data: [300, 50, 100, 150],
          backgroundColor: ['#3f344c', '#e53f65', '#ec6929', '#f5c548'],
          hoverBackgroundColor: ['#3f344c', '#e53f65', '#ec6929', '#f5c548'],
        },
      ],
    };

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
  }
}
