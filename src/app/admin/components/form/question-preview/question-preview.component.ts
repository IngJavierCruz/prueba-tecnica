import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// MODELS
import { DynamicFormControl } from '@models/DynamicFormControl';

@Component({
  selector: 'app-question-preview',
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.scss']
})
export class QuestionPreviewComponent implements OnInit {
  @Input() data!: DynamicFormControl;
  @Input() typesControlObject: any = {};
  @Output() edit = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  initEditDynamicFormControl() {
    this.edit.emit();
  }

}
