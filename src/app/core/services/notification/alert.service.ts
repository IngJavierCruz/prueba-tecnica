import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  clientName = 'Challenge';
  primaryColor = 'rgb(95, 63, 68)';

  constructor() {}

  showSuccess(text:string, timer = 1500) {
    Swal.fire({
      title: this.clientName,
      text: text,
      position: 'center',
      icon: 'success',
      showConfirmButton: true,
      confirmButtonColor: this.primaryColor,
      timer
    });
  }

  showSmallSuccess(text: string){
    Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
    }).fire({
      icon: 'success',
      title: this.clientName,
      text: text,
      confirmButtonColor: this.primaryColor,
    });
  }

  showError(message? : string) {
    Swal.fire({
      title: this.clientName,
      text: message || 'Error de servidor',
      position: 'center',
      icon: 'error',
      confirmButtonColor: this.primaryColor,
    });
  }

  showSmallErrorServer(message? : string) {
    Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
    }).fire({
      icon: 'error',
      title: this.clientName,
      text: message || 'Error de servidor',
    });
  }

  async showConfirmationDeletion({ title = "¡Confirmación de eliminación! ", text = "¿Eliminar Registro?" } = {}) {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: this.primaryColor,
      reverseButtons: true,
    });

    return result.isConfirmed;
  }

  async showConfirmationAction({ title = "¡Confirmación! ", text = "¿Esta seguro que desea realizar esta acción?" } = {}) {
    const result = await Swal.fire({
      title,
      text,
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: this.primaryColor,
      reverseButtons: true,
    });

    return result.isConfirmed;
  }
}
