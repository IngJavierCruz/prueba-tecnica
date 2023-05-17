import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// LIBS
import { Subscription } from 'rxjs/internal/Subscription';
// SERVICES
import { DynamicFormService } from '@services/form-control/dynamic-form.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '@services/notification/alert.service';
// MODELS
import { DynamicForm } from '@models/DynamicForm';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    private router: Router,
    private dynamicFormService: DynamicFormService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      status: ["open", [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeDialog() { this.dialogRef.close(); }

  onSubmit($event: Event) {
    $event.preventDefault();
    if (this.form.valid) {
      this.save();
    } else {
      this.alertService.showError('Completa los datos del formulario');
    }
  }

  save() {
    this.spinner.show();
    this.subscription.add(
      this.dynamicFormService.add(this.form.value).subscribe({
        next: (data: DynamicForm) => {
          console.log(data);
          this.router.navigate(['/admin/forms', data.id!]);
          this.alertService.showSmallSuccess('Registro agregado correctamente');
          this.closeDialog();
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

}
