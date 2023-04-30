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
import { ProfilesService } from '@services/profiles/profiles.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  TYPE_USER = TYPE_USER;

  constructor(
    public authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private ProfilesService: ProfilesService,
  ) { }

  ngOnInit() {
    this.ProfilesService.getAll().subscribe(x => {
      console.log(x);
    })
  }

  ngOnDestroy(): void { this.subscription.unsubscribe();}
}



