import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ui-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'ui-menu'},
})
export class UIMenu implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
