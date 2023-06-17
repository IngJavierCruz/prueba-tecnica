import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.css']
})
export class AudiosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('inicializado audios');
  }

}
