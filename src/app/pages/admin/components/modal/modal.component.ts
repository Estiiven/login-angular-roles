import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';//token
import { BaseFormUser } from 'src/app/shared/utils/base-form-user';
import { UsersService } from '../../services/users.service';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  verContrase = true;

  actionTODO = Action.NEW;

  hide = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userForm: BaseFormUser,
    private userSvc: UsersService,
  ) { }

  ngOnInit(): void {
    //EDITAR
    if (this.data?.user.hasOwnProperty('id')) {//si el usuario llega con id significa que se requiere editar
      this.actionTODO = Action.EDIT;
      this.verContrase = false;
      this.userForm.baseForm.get('password').setValidators(null);//desvalidamos el campo password para cuando se ste editando
      //this.userForm.baseForm.get('password').clearValidators();
      this.userForm.baseForm.updateValueAndValidity();//se vuelven a chekear los valores y validadores del formulario
      this.data.tittle = 'Modificar datos del usuario '; //titulo para cuando se este editando

      this.pathFormData();
    }
  }
  //GUARDAR O EDITAR NUEVO USUARIO
  onSave(): void {
    const formValue = this.userForm.baseForm.value;
    if (this.actionTODO === Action.NEW) { // SI SE ELIGE GUARDAR
      this.userSvc.new(formValue).subscribe((res) => {
        console.log('New ', res); //TODO: error 200: hasta ahora funca con responseType
      });

    } else { //EDITAR
      const userId = this.data?.user?.id; // recuperamos el id del usuario
      this.userSvc.update(userId, formValue).subscribe((res) => {
        console.log('Update', res);
        //this.userForm.baseForm.setValue([]);
      });
    }
  }
  //metodo para comprobar el formulario
  checkField(field: string): boolean {
    return this.userForm.isValidField(field);//nombre del campo
  }
  //Cargamos los campos al formulario del usuario a editar
  private pathFormData(): void {
    this.userForm.baseForm.patchValue({ //patchValue actualiza todos los campos que encuentre en el modelo que le pases como parámetro.
      username: this.data?.user?.username,
      role: this.data?.user?.role,
    });
  }

}
