import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-tab-content-body',
  templateUrl: './tab-content-body.html',
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'content-body' },
  styleUrls: ['./tab-content-body.scss']
})
export class UITabContentBody implements OnInit {
  constructor() { }

  ngOnInit() {}

}
