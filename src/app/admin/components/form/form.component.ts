import { Component, OnDestroy, OnInit } from '@angular/core';
// LIBS
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  constructor(
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
