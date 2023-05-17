import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// LIBS
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
// SERVICES
import { NgxSpinnerService } from 'ngx-spinner';
import { FormUserService } from '@services/form-control/form-user.service';
// MODELS
import { COLUMNS } from './columns';
import { FormUser } from '@models/FormUser';
import { STATUS_FORM_USER } from '@constants/Status';
import { DynamicForm } from '@models/DynamicForm';

@Component({
  selector: 'app-forms-answers',
  templateUrl: './forms-answers.component.html',
  styleUrls: ['./forms-answers.component.scss']
})
export class FormsAnswersComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  displayedColumns: string[] = COLUMNS;
  dataSource = new MatTableDataSource<FormUser>([]);
  STATUS_FORM_USER = STATUS_FORM_USER;
  dynamicForm!: DynamicForm;

  constructor(
    private formUserService: FormUserService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.dynamicForm = this.route.snapshot.data['data'];
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadData() {
    this.spinner.show();
    this.subscription.add(
      this.formUserService.getByParentId(this.dynamicForm.id!).subscribe({
        next: (data: FormUser[]) => {
          this.dataSource.data = data;
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }
}
