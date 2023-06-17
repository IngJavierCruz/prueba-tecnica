import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ui-sidebar-filter',
  templateUrl: './sidebar-filter.html',
  styleUrls: ['./sidebar-filter.scss'],
  host: {
    'class': 'sidebar-filter'
  }
})
export class UISidebarFilter implements OnInit {
  @Output() clear = new EventEmitter();
  @Input() disabled = false;

  constructor() { }

  ngOnInit() {
  }

}
