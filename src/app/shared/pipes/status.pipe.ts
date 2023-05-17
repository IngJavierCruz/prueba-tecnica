import { Pipe, PipeTransform } from '@angular/core';
import { STATUS_FORM } from '@constants/Status';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    switch (value) {
      case STATUS_FORM.open:
        return 'Abierto'
      case STATUS_FORM.process:
        return 'En proceso'
      case STATUS_FORM.closed:
        return 'Cerrado'
      default:
        return 'No definido'
    }
  }
}
