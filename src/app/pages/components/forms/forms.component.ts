import { Component, OnInit, OnDestroy } from '@angular/core';
// ANGULAR MATERIAL
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
// COMPONENTS
// LIBS
import { Subscription } from 'rxjs/internal/Subscription';
// SERVICES
import { NgxSpinnerService } from 'ngx-spinner';
import { FormUserService } from '@services/form-control/form-user.service';
import { AuthenticationConfigurationService } from '@services/authentication/authentication-configuration.service';
// MODELS
import { COLUMNS } from './columns';
import { FormUser } from '@models/FormUser';
import { STATUS_FORM_USER } from '@constants/Status';

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
    private authConfigService: AuthenticationConfigurationService,
    private formUserService: FormUserService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
}
