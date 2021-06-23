import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

import {ComponentCanDeactivate} from './component-can-deactivate';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {

  constructor(private confDialog : ConfirmationDialogService){}
  canDeactivate(component: ComponentCanDeactivate): boolean {

    if(!component.canDeactivate()){
        if (confirm("Nalaz niste spremili. Ukoliko napustite stranicu, vaše izmjene će biti izgubljene!")) {
            return true;
        } else {
            return false;
        }

      //  if( this.confDialog.confirm('Upozorenje', 'Nalaz niste spremili. Ukoliko napustite stranicu, vaše izmjene će biti izgubljene!',"Napusti","Odustani")
      //   .then((confirmed) => {
      //     if(confirmed == true){

      //       return true
      //     }else{
      //       return false;
      //     }
      //   })
      //   .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'))){

      //   }

    }
    return true;
  }
}
