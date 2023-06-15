import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'native-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class NativeCard implements OnInit {

  constructor() {
    console.log('native card create');
  }

  ngOnInit() {
  }

}
