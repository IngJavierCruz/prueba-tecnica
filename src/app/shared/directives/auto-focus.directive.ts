import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[autofocus]',
})
export class AutoFocusDirective implements OnInit{
  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    console.log(this.elRef.nativeElement);
    this.elRef.nativeElement.focus();
  }
}