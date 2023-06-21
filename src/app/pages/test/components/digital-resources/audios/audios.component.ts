import { Component, Input, OnInit } from '@angular/core';
import { Tab } from '../digital-resources';
import { MatDialog } from '@angular/material/dialog';
import { UIMultimediaDialog } from '@shared/modules/native/ui/multimedia-dialog/multimedia-dialog';
import { Multimedia } from '@app/pages/test/models/Multimedia';
import { DATA } from './audios';
import { FilterDigitalResource } from '@app/pages/test/models/FilterDigitalResource';


@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.scss'],
})
export class AudiosComponent implements OnInit {
  @Input()
  tab!: Tab;
  private filterActive: FilterDigitalResource = {search: ''};
  @Input()
  get filters() { return this.filterActive; }
  set filters(value: FilterDigitalResource) {
    this.filterActive = {...value, search: this.filterActive.search};
    this.loadData();
  }

  displayedColumns: string[] = ['iconLabel', 'title', 'action'];
  dataSource: Multimedia[] = DATA;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  search(value: string) {
    this.filterActive = {...this.filterActive, search: value};
    this.loadData();
  }

  clearFilters() {
    console.log('clear filters');
  }

  showResource(resource: Multimedia) {
    this.dialog.open(UIMultimediaDialog, {
      data: resource,
      backdropClass: ['ui-backdropClass'],
      panelClass: ['ui-panelClass'],
      maxWidth: '900',
    })
  }

  loadData() {
    console.log('busqueda: ', this.filterActive);
  }
}














