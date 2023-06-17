import { Component, OnInit } from '@angular/core';
import { CONTENT_HEADER, TABS } from './digital-resources';
import { ContentHeader } from '../../models/ContentHeader';
import { NativeTabChangeEvent } from '@shared/modules/native/tabs/tab-group/tab-group';

@Component({
  selector: 'app-digital-resources',
  templateUrl: './digital-resources.component.html',
  styleUrls: ['./digital-resources.component.scss']
})
export class DigitalResourcesComponent implements OnInit {
  header: ContentHeader = CONTENT_HEADER;
  tabs = TABS;

  constructor() { }

  ngOnInit() {
  }

  changeTab(tab: NativeTabChangeEvent) {
    console.log("change tab", tab);
  }

  search(value: string) {
    console.log('busqueda: ', value);
  }

  clearFilters() {
    console.log('clear filters');
  }

}
