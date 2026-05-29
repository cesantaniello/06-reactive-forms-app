import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  myForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÁáÉéÍíÓóÚúÑñ]+ [a-zA-ZÁáÉéÍíÓóÚúÑñ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, this.noStrider]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required],
    }, { validators: this.passwordsMatch });
  }

  private noStrider(control: AbstractControl): ValidationErrors | null {
    return control.value?.toLowerCase() === 'strider' ? { noStrider: true } : null;
  }

  private passwordsMatch(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const pass2 = group.get('password2')?.value;
    return pass === pass2 ? null : { passwordsMatch: true };
  }

  isInvalid(field: string): boolean {
    const control = this.myForm.get(field);
    return !!(control?.invalid && control?.touched);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
  }
}
