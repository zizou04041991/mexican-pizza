import { Component, inject, ViewChild } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalServices } from '../../shared/services/modal-services';
import { FormField, GenericForm } from '../../shared/components/generic-form/generic-form';

@Component({
  selector: 'app-form-send-data-client',
  imports: [ReactiveFormsModule,GenericForm],
  templateUrl: './form-send-data-client.html',
  styleUrl: './form-send-data-client.scss',
})
export class FormSendDataClient {
  modalService = inject(ModalServices);
  @ViewChild(GenericForm) genericForm!: GenericForm;

  formFields: FormField[] = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',  // <-- Tipo literal, no string
      required: true,
      span: 'half',
      validationMessages: {
        required: 'El nombre es requerido'
      }
    },
    {
      name: 'lastName',
      label: 'Apellido',
      type: 'text',  // <-- Tipo literal
      required: true,
      span: 'half',
      validationMessages: {
        required: 'El apellido es requerido'
      }
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',  // <-- Tipo literal
      required: true,
      span: 'full',
      validators: [Validators.email],
      validationMessages: {
        required: 'El email es requerido',
        email: 'Ingrese un email válido'
      }
    },
    {
      name: 'address',
      label: 'Dirección',
      type: 'textarea',  // <-- Tipo literal
      required: true,
      span: 'full',
      validationMessages: {
        required: 'La dirección es requerida'
      }
    },
    {
      name: 'dni',
      label: 'DNI',
      type: 'text',  // <-- Tipo literal
      required: true,
      span: 'half',
      validationMessages: {
        required: 'El DNI es requerido'
      }
    },
    {
      name: 'movil',
      label: 'Teléfono Móvil',
      type: 'tel',  // <-- Tipo literal
      required: true,
      span: 'half',
      validators: [Validators.pattern('[0-9]{9}')],
      validationMessages: {
        required: 'El teléfono es requerido',
        pattern: 'Ingrese 9 dígitos numéricos'
      }
    }
  ];

  aceptar(): void {
    if (this.genericForm.isValid()) {
      this.modalService.closeWithResult(this.genericForm.getFormValues());
    } else {
      this.genericForm.allTouched();
    }
  }

  cancelar(): void {
    this.modalService.closeWithResult();
  }
}
