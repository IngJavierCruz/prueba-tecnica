import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// LIBS
import { Subscription } from 'rxjs/internal/Subscription';
// COMPONENT
import { QuestionOptionsComponent } from '../question-options/question-options.component';
// SERVICES
import { AlertService } from '@services/notification/alert.service';
import { DynamicFormControlService } from '@services/form-control/dynamic-form-control.service';
import { NgxSpinnerService } from 'ngx-spinner';
// MODELS
import { CatalogBase } from '@models/TypeControl';
import { DynamicFormControl } from '@models/DynamicFormControl';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  @ViewChild('labelFocus') labelFocus!: ElementRef;
  @Input() data!: DynamicFormControl;
  @Input() disabled: boolean = false;
  @Input() typesControls: CatalogBase[] = [];
  @Input() typesControlObject: any = {};
  @Output() remove = new EventEmitter<DynamicFormControl>();
  @Output() create = new EventEmitter();
  @Output() changes = new EventEmitter<DynamicFormControl>();
  @ViewChild(QuestionOptionsComponent) questionOptionsComponent!: QuestionOptionsComponent;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private dynamicFormControlService: DynamicFormControlService,
  ) {

  }

  ngOnInit() {
    this.createForm();
    this.onChangesForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onChangesForm() {
    this.subscription.add(
      this.form.valueChanges.pipe(
        debounceTime(500)
      ).subscribe(x => {
        this.update();
      })
    )
  }

  formValid() {
    if (!this.form.valid) {
      this.form.markAsDirty();
      this.form.markAllAsTouched();
    }
    return this.form.valid && this.questionOptionsComponent.validateForm();
  }

  focus() {
    this.labelFocus.nativeElement.focus();
  }

  createForm() {
    const { id, label, typeControl, dynamicFormId } = this.data;
    this.form = this.fb.group({
      dynamicFormId: [dynamicFormId, Validators.required],
      id: [id, [Validators.required]],
      label: [label, [Validators.required]],
      typeControl: [typeControl, Validators.required],
    });
    this.disabled && this.form.disable();
  }

  get typeControlId() {
    return this.form.controls['typeControl']?.value as number || null;
  }

  get isTypeControlList() {
    return [3, 4, 5].includes(this.typeControlId as any);
  }

  disabledForm() {
    this.form.disable({ emitEvent: false });
    this.questionOptionsComponent.form.disable({ emitEvent: false });
  }

  delete() {
    this.spinner.show();
    this.subscription.add(
      this.dynamicFormControlService.delete(this.data.id!).subscribe({
        next: () => {
          this.alertService.showSmallSuccess('Registro eliminado correctamente');
          this.remove.emit(this.data)
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  validateForm() {
    this.form.markAsDirty();
    this.form.markAllAsTouched();
    this.alertService.showError('Completa los campos del formulario');
  }

  update() {
    this.spinner.show();
    this.subscription.add(
      this.dynamicFormControlService.update(this.form.value).subscribe({
        next: (data: DynamicFormControl) => {
          // this.alertService.showSmallSuccess('Registro actualizado correctamente');
          this.changes.emit(data);
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  addNew() {
    this.create.emit();
  }
}
