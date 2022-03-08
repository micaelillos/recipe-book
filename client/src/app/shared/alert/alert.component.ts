import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message = ''
  @Output() close = new Subject<void>()
  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.close.next()
  }

}
