import { Component, OnInit, Input } from '@angular/core';
import { ContentHeader } from '@app/pages/test/models/ContentHeader';

@Component({
  selector: 'ui-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class UISidebar implements OnInit {
  @Input() header!: ContentHeader;

  constructor() { }

  ngOnInit() {
  }

}
