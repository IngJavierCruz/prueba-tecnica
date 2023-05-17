import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// ANGULAR MATERIAL
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
// COMPONENTS
// LIBS
import { Subscription } from 'rxjs/internal/Subscription';
// SERVICES
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '@services/notification/alert.service';
import { FormUserService } from '@services/form-control/form-user.service';
import { AuthenticationConfigurationService } from '@services/authentication/authentication-configuration.service';
// MODELS
import { COLUMNS } from './columns';
import { FormUser } from '@models/FormUser';
import { STATUS_FORM_USER } from '@constants/Status';
import { TYPE_USER } from '@constants/TypeUser';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  displayedColumns: string[] = COLUMNS;
  dataSource = new MatTableDataSource<FormUser>([]);
  STATUS_FORM_USER = STATUS_FORM_USER;

  constructor(
    private alertService: AlertService,
    private authConfigService: AuthenticationConfigurationService,
    private formUserService: FormUserService,
    public dialog: MatDialog,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    if (this.isAdmin) {
      this.loadData();
    } else {
      this.loadData();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get isAdmin() {
    return this.authConfigService.typeUser === TYPE_USER.admin;
  }

  loadData() {
    const id = this.authConfigService.userId;
    this.spinner.show();
    this.subscription.add(
      this.formUserService.getAll(id).subscribe({
        next: (data: FormUser[]) => {
          this.dataSource.data = data;
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  loadAll() {
    this.spinner.show();
    this.subscription.add(
      this.formUserService.getAll().subscribe({
        next: (data: FormUser[]) => {
          this.dataSource.data = data;
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }
}
