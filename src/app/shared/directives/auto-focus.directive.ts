import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[autofocus]',
})
export class AutoFocusDirective implements OnInit{
  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.elRef.nativeElement.focus();
  }
}