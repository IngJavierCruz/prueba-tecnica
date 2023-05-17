import { Pipe, PipeTransform } from '@angular/core';
import { STATUS_FORM_USER } from '@constants/Status';
import { FormUser } from '@models/FormUser';

@Pipe({
  name: 'countStatusFormUser'
})
export class CountStatusFormUserPipe implements PipeTransform {

  transform(value: FormUser[] = [], args?: any): any {
    console.log(value);
    return value.filter(x => x.status === STATUS_FORM_USER.answered).length;
  }
}
