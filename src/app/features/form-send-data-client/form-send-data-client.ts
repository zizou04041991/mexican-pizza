import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalServices } from '../../shared/services/modal-services';

@Component({
  selector: 'app-form-send-data-client',
  imports: [ReactiveFormsModule],
  templateUrl: './form-send-data-client.html',
  styleUrl: './form-send-data-client.scss',
})
export class FormSendDataClient {
  registerDataPersonForm: FormGroup;

  constructor(private fb: FormBuilder, private modalService: ModalServices) {
    this.registerDataPersonForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      dni: ['', Validators.required],
      movil: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
    });
  }

  aceptar(): void {
    if (this.registerDataPersonForm.valid) {
      this.modalService.closeWithResult(this.registerDataPersonForm);
    } else {
      this.registerDataPersonForm.markAllAsTouched();
    }
  }

  cancelar(): void {
    // Cerramos sin devolver datos (o podríamos devolver null)
    this.modalService.closeWithResult();
  }
}
