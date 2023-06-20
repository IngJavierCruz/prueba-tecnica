import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ui-tab-content-body',
  templateUrl: './tab-content-body.html',
  encapsulation: ViewEncapsulation.None,
  inputs: ['rounded'],
  host: {
    'class': 'content-body',
    '[class.content-body-rounded]': 'rounded'
  },
  styleUrls: ['./tab-content-body.scss']
})
export class UITabContentBody {
  constructor() { }

  ngOnInit() { }

}
