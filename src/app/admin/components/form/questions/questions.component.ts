import { Component, OnInit, Input, OnDestroy, ViewChild, QueryList, ElementRef, ViewChildren } from '@angular/core';
// LIBS
import { Subscription } from 'rxjs/internal/Subscription';
// SERVICES
import { AlertService } from '@services/notification/alert.service';
import { TypeControlService } from '@services/form-control/type-control.service';
import { DynamicFormControlService } from '@services/form-control/dynamic-form-control.service';
import { NgxSpinnerService } from 'ngx-spinner';
// MODELS
import { CatalogBase } from '@models/TypeControl';
import { DynamicFormControl } from '@models/DynamicFormControl';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  dynamicControlsRefs!: QueryList<ElementRef>;
  @Input() dynamicFormId!: number;
  @Input() disabled: boolean = false;
  typesControls: CatalogBase[] = [];
  typesControlObject: any = {};
  dynamicFormControls: DynamicFormControl[] = [];
  @ViewChildren(QuestionComponent) questionsComponent!: QueryList<QuestionComponent>

  constructor(
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private typeControlService: TypeControlService,
    private dynamicFormControlService: DynamicFormControlService,
  ) {
  }

  ngOnInit() {
    this.loadTypesControls();
    this.loadDynamicFormControls();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  disabledForm() {
    this.questionsComponent.forEach(x => {
      x.disabledForm();
    })
  }

  trackByFn(index: number, item: DynamicFormControl) {
    return item.id!;
  }

  scrollToCard(index: number) {
    setTimeout(() => {
      document.getElementsByClassName('card-question')[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 250);
  }

  focusToCard(index: number) {
    setTimeout(() => this.questionsComponent.get(index)?.focus());
  }

  loadDynamicFormControls() {
    this.spinner.show();
    this.subscription.add(
      this.dynamicFormControlService.getByParentId(this.dynamicFormId).subscribe({
        next: (data: DynamicFormControl[]) => {
          this.dynamicFormControls = data;
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  loadTypesControls() {
    this.spinner.show();
    this.subscription.add(
      this.typeControlService.getAll().subscribe({
        next: (data: CatalogBase[]) => {
          this.typesControls = data;
          this.typesControlObject = data.reduce((acc, curr) =>
            ({
              ...acc,
              [curr.id]: curr,
            }), {});
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  createNewFormControl() : DynamicFormControl {
    return {
      dynamicFormId: this.dynamicFormId,
      label: '',
      typeControl: 1,
    };
  }

  removeDynamicFormControl(item: DynamicFormControl) {
    this.dynamicFormControls = this.dynamicFormControls.filter(x => x.id !== item.id);
  }

  saveDynamicFormControl() {
    this.spinner.show();
    const data: DynamicFormControl = this.createNewFormControl();
    this.subscription.add(
      this.dynamicFormControlService.add(data).subscribe({
        next: (data: DynamicFormControl) => {
          this.dynamicFormControls.push(data);
          const newIndex = this.dynamicFormControls.length - 1;
          this.scrollToCard(newIndex);
          this.focusToCard(newIndex);
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  updateDynamicFormControl(item: DynamicFormControl, index: number) {
    this.dynamicFormControls[index] = item;
  }

  invalidQuestions() {
    return this.questionsComponent
    .map(x => x.formValid()).filter(x => !x).length;
  }
}
