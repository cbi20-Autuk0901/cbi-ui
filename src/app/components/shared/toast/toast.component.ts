import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  @Input() id: string;
  @Input() toastHeader: string;
  @Input() toastMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
