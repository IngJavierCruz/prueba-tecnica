import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
// RXJS
import { Subscription } from 'rxjs';
// ANGULAR MATERIAL
import { MatDialog } from '@angular/material/dialog';
// COMPONENTS
// SERVICES
import { AuthenticationService } from '@services/authentication/authentication.service';
// CONFIG
import { TYPE_USER } from '@constants/TypeUser';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  TYPE_USER = TYPE_USER;

  constructor(
    public authenticationService: AuthenticationService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void { this.subscription.unsubscribe();}
}



