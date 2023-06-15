import { Component, OnInit } from '@angular/core';
import { NativeTabChangeEvent } from '@shared/modules/native/tabs/tab-group/tab-group';

@Component({
  selector: 'app-tab-view-implementation',
  templateUrl: './tab-view-implementation.component.html',
  styleUrls: ['./tab-view-implementation.component.scss']
})
export class TabViewImplementationComponent implements OnInit {
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
      this.tabs.push({
        textLabel: 'label 3 nuevo fin',
      })
    }, 5000);
  }

  changeTab(tab: NativeTabChangeEvent) {
    // console.log("change tab", tab);
  }

}
