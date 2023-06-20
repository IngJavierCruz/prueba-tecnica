import { Component, Input, OnInit } from '@angular/core';
import { Tab } from '../digital-resources';
import { MatDialog } from '@angular/material/dialog';
import { UIMultimediaDialog } from '@shared/modules/native/ui/multimedia-dialog/multimedia-dialog';
import { Multimedia } from '@app/pages/test/models/Multimedia';
import { DATA } from './audios';


@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.scss'],
})
export class AudiosComponent implements OnInit {
  @Input() tab!: Tab;
  displayedColumns: string[] = ['iconLabel', 'title', 'action'];
  dataSource: Multimedia[] = DATA;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    console.log('inicializado audios');
  }

  search(value: string) {
    console.log('busqueda: ', value);
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
}














