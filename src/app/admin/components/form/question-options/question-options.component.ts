import { Component, OnInit, Input, OnDestroy, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// LIBS
import { Subscription } from 'rxjs/internal/Subscription';
// SERVICES
import { NgxSpinnerService } from 'ngx-spinner';
import { TypeControlOptionService } from '@services/form-control/type-control-option.service';
// MODELS
import { TypeControlOption } from '@models/TypeControlOption';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-question-options',
  templateUrl: './question-options.component.html',
  styleUrls: ['./question-options.component.scss'],
})
export class QuestionOptionsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  isFirst = true;
  form!: FormGroup;
  @Input() disabled: boolean = false;
  @ViewChildren('refInputs') refInputs!: QueryList<ElementRef>;
  @Input() dynamicFormControlId!: number;
  typeControlId?: number;
  @Input() set typeControl(value: number) {
    const previous = this.typeControlId;
    const isEqualList = [3, 4, 5].includes(previous as any);
    this.typeControlId = value;
    if (!this.isFirst && !this.isTypeControlList) {
      this.deleteRange();
    } else if (!this.isFirst && this.isTypeControlList && !isEqualList) {
      this.loadConfigurationInitial();
    } else if (this.isFirst && this.isTypeControlList) {
      this.loadTypeControlOptions();
    }
    this.isFirst = false;
  };

  constructor(
    private fb: FormBuilder,
    private typeControlOptionService: TypeControlOptionService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      options: this.fb.array([])
    });
    this.disabled && this.form.disable();
  }

  get formsOptions(): FormArray {
    return this.form.get('options') as FormArray;
  }

  get isTypeControlList() {
    return [3, 4, 5].includes(this.typeControlId as any);
  }

  trackByFn(index: any, item: AbstractControl) {
    return item.value.id;
  }

  scrollToCard(id: number) {
    setTimeout(() => {
      document.getElementById('form-option' + id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 250);
  }

  focusToInput(index: number) {
    setTimeout(() => this.refInputs.get(index)?.nativeElement.focus());
  }

  onChangesForm(controls: AbstractControl[]) {
    this.subscription.add(
      controls.forEach(x => {
        x.valueChanges.pipe(
          debounceTime(500)
        ).subscribe(x => {
          this.update(x);
        })
      })
    );
  }

  loadTypeControlOptions() {
    this.subscription.add(
      this.typeControlOptionService.getByParentId(this.dynamicFormControlId!)
        .subscribe({
          next: (options: TypeControlOption[]) => {
            options.forEach(x => {
              const formOption = this.createFormTypeControlOption(x);
              this.formsOptions.push(formOption);
            });
            this.disabled && this.form.disable();
            this.onChangesForm(this.formsOptions.controls);
            this.loadConfigurationInitial();
          },
          error: (err: any) => console.log(err.message)
        }).add(() => this.spinner.hide()));
  }

  loadConfigurationInitial() {
    if (this.formsOptions.value.length === 0) {
      const [, option] = this.createDefaultOption();
      this.addOption(option as TypeControlOption, 0);
    }
  }

  createDefaultOption() {
    const option: TypeControlOption = this.createTypeControlOption();
    const optionForm = this.createFormTypeControlOption(option);
    return [optionForm, option];
  }

  createFormTypeControlOption(item: TypeControlOption) {
    return this.fb.group({
      dynamicFormControlId: [item.dynamicFormControlId, Validators.required],
      id: [item.id, [Validators.required]],
      label: [item.label, [Validators.required]],
      typeControlId: [item.typeControlId, Validators.required],
    });
  }

  createTypeControlOption(): TypeControlOption {
    return {
      dynamicFormControlId: this.dynamicFormControlId!,
      typeControlId: this.typeControlId!,
      label: '',
    };
  }

  addOption(data: TypeControlOption, index: number) {
    this.subscription.add(
      this.typeControlOptionService.add(data).subscribe({
        next: (data: TypeControlOption) => {
          const newFormOption = this.createFormTypeControlOption(data);
          this.formsOptions.insert(index, newFormOption);
          this.onChangesForm([newFormOption]);
          this.focusToInput(index);
          this.scrollToCard(data.id!);
        },
        error: (err: any) => console.log(err.message)
      }));
  }

  deleteOption(item: TypeControlOption, index: number, $event: Event) {
    $event.stopPropagation();
    this.subscription.add(
      this.typeControlOptionService.delete(item.id!).subscribe({
        next: () => {
          this.formsOptions.removeAt(index);
          const countOptions = this.formsOptions.length;
          if (countOptions === 0) {
            const [, option] = this.createDefaultOption();
            this.addOption(option as TypeControlOption, index)
          }
        },
        error: (err: any) => console.log(err.message)
      }));
  }

  deleteRange() {
    const options = this.formsOptions.value as TypeControlOption[];
    const data = options.filter(x => x.id)
    this.subscription.add(
      this.typeControlOptionService.deleteRange(data).subscribe({
        next: () => {
          this.subscription.unsubscribe();
          this.formsOptions.clear();
        },
        error: (err: any) => console.log(err.message)
      }));
  }

  update(item: TypeControlOption) {
    this.subscription.add(
      this.typeControlOptionService.update(item).subscribe({
        next: (data: any) => {
          console.log(data, 'update');
        },
        error: (err: any) => console.log(err.message)
      }));
  }

  addNewOptionDefault(index: number) {
    const [, option] = this.createDefaultOption();
    this.addOption(option as TypeControlOption, index + 1);
  }

  validateForm() {
    if (!this.form.valid) {
      this.form.markAsDirty();
      this.form.markAllAsTouched();
      return false;
    }

    return true;
  }

}
