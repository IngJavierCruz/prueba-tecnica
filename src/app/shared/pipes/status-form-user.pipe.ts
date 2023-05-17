import { Pipe, PipeTransform } from '@angular/core';
import { STATUS_FORM_USER } from '@constants/Status';

@Pipe({
  name: 'statusFormUser'
})
export class StatusFormUserPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    switch (value) {
      case STATUS_FORM_USER.open:
        return 'Sin responder'
        case STATUS_FORM_USER.answered:
          return 'Contestada'
      default:
        return 'No definido'
    }
  }
}
