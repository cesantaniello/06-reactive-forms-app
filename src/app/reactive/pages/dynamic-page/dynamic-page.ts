import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
})
export class DynamicPage {
  myForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      favoritos: this.fb.array([
        this.fb.control('Call of Duty', Validators.required),
      ]),
    });
  }

  get favoritos(): FormArray {
    return this.myForm.get('favoritos') as FormArray;
  }

  getControl(index: number): FormControl {
    return this.favoritos.at(index) as FormControl;
  }

  addFavorite(value: string): void {
    if (!value.trim()) return;
    this.favoritos.push(this.fb.control(value.trim(), Validators.required));
  }

  removeFavorite(index: number): void {
    this.favoritos.removeAt(index);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
  }
}
