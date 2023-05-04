import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isEqual } from "lodash";
// SERVICES
import { AlertService } from '@services/notification/alert.service';
import { DynamicFormControlService } from '@services/form-control/dynamic-form-control.service';
import { NgxSpinnerService } from 'ngx-spinner';
// MODELS
import { CatalogBase } from '@models/TypeControl';
import { DynamicFormControl } from '@models/DynamicFormControl';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  @Input() data!: DynamicFormControl;
  @Input() typesControls: CatalogBase[] = [];
  @Output() remove = new EventEmitter<DynamicFormControl>();
  @Output() create = new EventEmitter();
  @Output() changes = new EventEmitter<DynamicFormControl>();
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private dynamicFormControlService: DynamicFormControlService,

  ) { }

  ngOnInit() {
    const { id, label, typeControl, dynamicFormId } = this.data;
    this.form = this.fb.group({
      dynamicFormId: [dynamicFormId, Validators.required],
      id: [id, [Validators.required]],
      label: [label, [Validators.required]],
      typeControl: [typeControl, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get changesPending() {
    const formControlActive = this.form.value as DynamicFormControl;
    return !isEqual(this.data, formControlActive);
  }

  delete() {
    this.spinner.show();
    this.subscription.add(
      this.dynamicFormControlService.delete(this.data.id!).subscribe({
        next: () => {
          this.alertService.showSmallSuccess('Registro eliminado correctamente');
          this.remove.emit()
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  validateForm() {
    this.form.markAsDirty();
    this.form.markAllAsTouched();
    this.alertService.showError('Completa los campos del formulario');
  }

  validateChangesPending() {
    let changesPendient = true;
    if (this.form.valid) {
      if (!this.changesPending) {
        changesPendient = false;
      } else {
        this.alertService.showError('Tienes cambios sin guardar');
      }
    } else {
      this.validateForm();
    }
    return changesPendient;
  }

  saveChanges($event: Event) {
    $event.preventDefault();
    if (this.form.valid) {
      this.update();
    } else {
      this.alertService.showError('Completa los campos del formulario');
    }
  }

  update() {
    this.spinner.show();
    this.subscription.add(
      this.dynamicFormControlService.update(this.form.value).subscribe({
        next: (data: DynamicFormControl) => {
          this.alertService.showSmallSuccess('Registro actualizado correctamente');
          this.form.setValue(data);
          this.changes.emit(data);
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  addNew() {
    this.create.emit();
  }
}
