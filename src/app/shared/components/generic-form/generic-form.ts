import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'password' | 'number';
  required?: boolean;
  placeholder?: string;
  span?: 'full' | 'half';
  validationMessages?: { [key: string]: string };
  pattern?: string;
  validators?: any[];
}

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './generic-form.html',
  styleUrls: ['./generic-form.scss']
})
export class GenericForm {
  @Input() fields: FormField[] = [];
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({});
  }

  ngOnInit() {
    const group: any = {};
    
    this.fields.forEach(field => {
      const validators = [];
      
      if (field.required) {
        validators.push(Validators.required);
      }
      
      if (field.pattern) {
        validators.push(Validators.pattern(field.pattern));
      }
      
      if (field.validators) {
        validators.push(...field.validators);
      }
      
      group[field.name] = ['', validators];
    });

    this.formGroup = this.fb.group(group);
  }

  getFieldSpanClass(field: FormField): string {
    return field.span === 'full' ? 'md:col-span-2' : 'md:col-span-1';
  }

  getFieldClasses(fieldName: string): { [key: string]: boolean } {
    const control = this.formGroup.get(fieldName);
    const isInvalid = control ? control.invalid && control.touched : false;
    
    return {
      'border-red-500': isInvalid,
      'focus:ring-red-500': isInvalid,
      'focus:border-red-500': isInvalid,
      'focus:ring-blue-500': !isInvalid,
      'focus:border-blue-500': !isInvalid
    };
  }

  getErrors(fieldName: string): string[] {
    const control = this.formGroup.get(fieldName);
    const errors: string[] = [];
    
    if (!control || !control.errors) return errors;

    const fieldConfig = this.fields.find(f => f.name === fieldName);
    
    if (control.errors['required']) {
      errors.push(fieldConfig?.validationMessages?.['required'] || 'Este campo es requerido');
    }
    
    if (control.errors['email']) {
      errors.push(fieldConfig?.validationMessages?.['email'] || 'Ingrese un email válido');
    }
    
    if (control.errors['pattern']) {
      errors.push(fieldConfig?.validationMessages?.['pattern'] || 'El formato no es válido');
    }

    return errors;
  }

  getFormValues() {
    return this.formGroup.value;
  }

  isValid() {
    return this.formGroup.valid;
  }

  allTouched() {
    return this.formGroup.markAllAsTouched();
  }

  resetForm() {
    this.formGroup.reset();
  }
}