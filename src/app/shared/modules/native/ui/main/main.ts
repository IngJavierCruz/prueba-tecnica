import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ui-main',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'ui-main'
  }
})
export class UIMain implements OnInit {
  @Input()
  sidebarClass: string | string[] = '';
  @Input()
  contentClass: string | string[] = '';

  constructor() { }

  ngOnInit() {
  }

}
