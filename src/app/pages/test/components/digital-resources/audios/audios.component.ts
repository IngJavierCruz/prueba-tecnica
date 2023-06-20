import { Component, Input, OnInit } from '@angular/core';
import { Tab } from '../digital-resources';
export interface PeriodicElement {
  icon: number;
  name: string;
  action: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {icon: 1, name: 'Nulla facilisi dignissim', action: 1.0079, symbol: '• Nivel • Grado • Materia'},
  {icon: 2, name: 'Helium', action: 4.0026, symbol: 'He'},
  {icon: 3, name: 'Lithium', action: 6.941, symbol: 'Li'},
  {icon: 4, name: 'Beryllium', action: 9.0122, symbol: 'Be'},
  {icon: 5, name: 'Boron', action: 10.811, symbol: 'B'},
  {icon: 6, name: 'Carbon', action: 12.0107, symbol: 'C'},
  {icon: 7, name: 'Nitrogen', action: 14.0067, symbol: 'N'},
  {icon: 8, name: 'Oxygen', action: 15.9994, symbol: 'O'},
  {icon: 9, name: 'Fluorine', action: 18.9984, symbol: 'F'},
  {icon: 10, name: 'Neon', action: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.scss'],
})
export class AudiosComponent implements OnInit {
  @Input() tab!: Tab;
  displayedColumns: string[] = ['icon', 'name', 'action'];
  dataSource = ELEMENT_DATA;
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

  navegate() {
    
  }
  
}














