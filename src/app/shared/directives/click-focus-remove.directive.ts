import {Directive, HostListener, ElementRef} from '@angular/core';

@Directive({
  selector: '[clickFocusRemove]',
})
export class ClickFocusRemoveDirective {
  constructor(private elRef: ElementRef) {}

  @HostListener('click') onClick() {
    this.elRef.nativeElement.blur();
  }
}