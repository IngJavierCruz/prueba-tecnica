import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

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
  private isOpen = false;
  @Output()
  toggle = new EventEmitter();
  @Input()
  get open() { return this.isOpen }

  set open(value: boolean) {
    this.isOpen = value;
  }

  constructor() { }

  ngOnInit() {
  }
}
