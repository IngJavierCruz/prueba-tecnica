import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberInteger]'
})
export class NumberIntegerDirective {
  ValidCharacters: string[] = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  constructor() { }

  @HostListener('keypress', ['$event']) validateNumberOfkeyPress(event: KeyboardEvent) {
    if(!!this.ValidCharacters.find((character) => character == event.key) )
      return event;
    event.preventDefault();
    return;
  }
}