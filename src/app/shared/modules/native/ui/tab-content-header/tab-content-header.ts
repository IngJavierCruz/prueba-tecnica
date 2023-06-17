import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-tab-content-header',
  templateUrl: './tab-content-header.html',
  styleUrls: ['./tab-content-header.scss']
})
export class UITabContentHeader implements OnInit {
  @Input() title?: string = '';
  @Input() subtitle?: string = '';
  @Output() searchChange = new EventEmitter();
  subscription = new Subscription();
  search = new FormControl<string>('');

  constructor() { }

  ngOnInit() {}

  initSearch() {
    this.searchChange.emit(this.search.value);
  }

  clearSearch() {
    this.search.setValue('');
    this.initSearch();
  }

}
