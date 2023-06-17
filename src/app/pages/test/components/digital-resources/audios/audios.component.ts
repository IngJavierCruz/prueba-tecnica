import { Component, Input, OnInit } from '@angular/core';
import { Tab } from '../digital-resources';

@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.scss']
})
export class AudiosComponent implements OnInit {
  @Input() tab!: Tab;

  constructor() { }

  ngOnInit() {
    console.log('inicializado audios');
  }

  search(value: string) {
    console.log('busqueda: ', value);
  }

  clearFilters() {
    console.log('clear filters');
  }
  
}
