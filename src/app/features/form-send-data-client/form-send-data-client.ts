import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PizzaStore } from '../../store/store';

@Component({
  selector: 'app-form-send-data-client',
  imports: [ReactiveFormsModule],
  templateUrl: './form-send-data-client.html',
  styleUrl: './form-send-data-client.scss',
  //providers: [PizzaStore],
})
export class FormSendDataClient implements OnInit{
  registerDataPersonForm: FormGroup;
  readonly store = inject(PizzaStore);

  constructor(private fb: FormBuilder) {
    this.registerDataPersonForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      dni: ['', Validators.required],
      movil: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    if (this.registerDataPersonForm.valid) {
      this.store.updateClient(this.registerDataPersonForm.getRawValue());
    } else {
      this.registerDataPersonForm.markAllAsTouched();
    }
  }
}
