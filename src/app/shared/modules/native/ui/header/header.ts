import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ui-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "class": 'ui-header'
  }
})
export class UIHeader implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
