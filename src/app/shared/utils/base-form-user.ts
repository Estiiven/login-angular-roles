import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormUser {
  private emailCaracter = /\S+@\S+\.\S+/;// expresion que valida es la cadena es un email

  errorMessage = null;

  constructor(private form: FormBuilder) { }

  baseForm = this.form.group({
    username: [
      '',
      [
        Validators.required,
        Validators.pattern(this.emailCaracter)],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(7)
      ]
    ],
    role:[
      '',
    [
      Validators.required
    ]
    ],
  });

  //
  isValidField(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) &&
      !this.baseForm.get(field).valid
    );
  }

  //
  /*   MensajeError(campo: string): string {
    let message = null;
    const minlength = this.baseForm.get(campo).errors?.minlength?.requiredLength;//

    if(this.baseForm.get(campo).errors.required) { //traemos el valor del campo y compruebo si hay errores
      message = 'Ingrese un valor en el campo'; //
    }
    else if(this.baseForm.get(campo).hasError('pattern')){
      message = 'El correo ingresado no es valido'; //
    }
    else if(this.baseForm.get(campo).hasError('minlength')){

      message = `Minimo ${minlength} caracteres`; //
    }
    return message;
  } */
  private getErrorMessage(campo: string): void {
    const { errors } = this.baseForm.get(campo);

    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;
      const messages = {
        required: 'Debe ingresar un valor en el campo',
        pattern: 'Email incorrecto',
        minlength: `la contraseña debe ser minimo de ${minlenght} caracteres`,
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}
