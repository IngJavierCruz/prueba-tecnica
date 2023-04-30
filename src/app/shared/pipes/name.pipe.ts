import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@models/authentication/User';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(value: User, args?: any): any {
    return value && `${value.name} ${value.lastName}`;
  }

}
