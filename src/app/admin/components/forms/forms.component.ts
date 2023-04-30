import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// ANGULAR MATERIAL
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
// COMPONENTS
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
// LIBS
import { Subscription } from 'rxjs/internal/Subscription';
// SERVICES
import { DynamicFormService } from '@services/form-control/dynamic-form.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '@services/notification/alert.service';
// MODELS
import { COLUMNS } from './columns';
import { DynamicForm } from '@models/DynamicForm';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  displayedColumns: string[] = COLUMNS;
  dataSource = new MatTableDataSource<DynamicForm>([]);

  constructor(
    private alertService: AlertService,
    private dynamicFormService: DynamicFormService,
    public dialog: MatDialog,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadData() {
    this.spinner.show();
    this.subscription.add(
      this.dynamicFormService.getAll().subscribe({
        next: (data: any) => {
          this.dataSource.data = data;
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  edit(item: DynamicForm) {
    this.router.navigate(['/admin/forms/', item.id] );
  }

  async remove(item: DynamicForm) {
    if (await this.alertService.showConfirmationDeletion()) {
      this.spinner.show();
      this.subscription.add(
        this.dynamicFormService.delete(item.id!).subscribe({
          next: () => {
            this.alertService.showSmallSuccess('Registro eliminado correctamente');
            this.loadData();
          },
          error: (err: any) => console.log(err.message)
        }).add(() => this.spinner.hide()));
    }
  }

  openFormDialog() {
    this.dialog.open(FormDialogComponent);
  }
}
