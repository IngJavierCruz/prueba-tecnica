import { Component, OnInit } from '@angular/core';
import { NativeTabChangeEvent } from '@shared/modules/native/tabs/tab-group/tab-group';
import { TAB_HEADER_CONTENT } from './CONFIG';

@Component({
  selector: 'app-tab-view-implementation',
  templateUrl: './tab-view-implementation.component.html',
  styleUrls: ['./tab-view-implementation.component.scss']
})
export class TabViewImplementationComponent implements OnInit {
  title?: string = TAB_HEADER_CONTENT.title;
  subtitle? = TAB_HEADER_CONTENT.subtitle;
  mostrar = true;
  tabs = [
    {
      textLabel: 'Documentos',
      iconLabel: 'fa-regular fa-file-lines',
      iconLabelActive: 'fa-sharp fa-solid fa-file-invoice',
    },
    {
      textLabel: 'Imágenes',
      iconLabel: 'fa-solid fa-image',
      iconLabelActive: 'fa-solid fa-image',
    },
    {
      textLabel: 'label 3',
    },
    {
      textLabel: 'Documentos 2',
      iconLabel: 'fa-regular fa-file-lines',
      iconLabelActive: 'fa-sharp fa-solid fa-file-invoice',
    },
    {
      textLabel: 'Imágenes',
      iconLabel: 'fa-solid fa-image',
      iconLabelActive: 'fa-solid fa-image',
    },
    {
      textLabel: 'label 3',
    },
    {
      textLabel: 'Documentos 3',
      iconLabel: 'fa-regular fa-file-lines',
      iconLabelActive: 'fa-sharp fa-solid fa-file-invoice',
    },

    {
      textLabel: 'Imágenes y documentos',
      iconLabel: 'fa-solid fa-image',
      iconLabelActive: 'fa-solid fa-image',
    },
    {
      textLabel: 'Imágenes 6',
      iconLabel: 'fa-solid fa-image',
      iconLabelActive: 'fa-solid fa-image',
    },
    {
      textLabel: 'Documentos 5',
      iconLabel: 'fa-regular fa-file-lines',
      iconLabelActive: 'fa-sharp fa-solid fa-file-invoice',
    },

    {
      textLabel: 'Imágenes y documentos',
      iconLabel: 'fa-solid fa-image',
      iconLabelActive: 'fa-solid fa-image',
    },
    {
      textLabel: 'Imágenes 6',
      iconLabel: 'fa-solid fa-image',
      iconLabelActive: 'fa-solid fa-image',
    },
    {
      textLabel: 'Documentos',
      iconLabel: 'fa-regular fa-file-lines',
      iconLabelActive: 'fa-sharp fa-solid fa-file-invoice',
    },
    {
      textLabel: 'Imágenes y documentos 3',
      iconLabel: 'fa-solid fa-image',
      iconLabelActive: 'fa-solid fa-image',
    },
    {
      textLabel: 'label 3 fin',
    }
  ];

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.mostrar = false;
    }, 1000);
  }

  changeTab(tab: NativeTabChangeEvent) {
    // console.log("change tab", tab);
  }

  search(value: string) {
    console.log('busqueda: ', value);
  }

}
