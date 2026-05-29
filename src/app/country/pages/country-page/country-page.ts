import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Country {
  name: string;
  cca3: string;
}

@Component({
  selector: 'app-country-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './country-page.html',
})
export class CountryPage {
  regions = ['Europa', 'América', 'Asia', 'África', 'Oceanía'];

  private readonly countriesByRegion: Record<string, Country[]> = {
    Europa:  [{ name: 'España', cca3: 'ESP' }, { name: 'Francia', cca3: 'FRA' }, { name: 'Alemania', cca3: 'DEU' }],
    América: [{ name: 'México', cca3: 'MEX' }, { name: 'Argentina', cca3: 'ARG' }, { name: 'Colombia', cca3: 'COL' }],
    Asia:    [{ name: 'Japón', cca3: 'JPN' }, { name: 'China', cca3: 'CHN' }, { name: 'India', cca3: 'IND' }],
    África:  [{ name: 'Egipto', cca3: 'EGY' }, { name: 'Nigeria', cca3: 'NGA' }, { name: 'Sudáfrica', cca3: 'ZAF' }],
    Oceanía: [{ name: 'Australia', cca3: 'AUS' }, { name: 'Nueva Zelanda', cca3: 'NZL' }],
  };

  private readonly bordersByCountry: Record<string, Country[]> = {
    ESP: [{ name: 'Francia', cca3: 'FRA' }, { name: 'Portugal', cca3: 'PRT' }],
    FRA: [{ name: 'España', cca3: 'ESP' }, { name: 'Alemania', cca3: 'DEU' }, { name: 'Italia', cca3: 'ITA' }],
    DEU: [{ name: 'Francia', cca3: 'FRA' }, { name: 'Polonia', cca3: 'POL' }],
    MEX: [{ name: 'Guatemala', cca3: 'GTM' }, { name: 'Estados Unidos', cca3: 'USA' }],
    ARG: [{ name: 'Chile', cca3: 'CHL' }, { name: 'Brasil', cca3: 'BRA' }, { name: 'Uruguay', cca3: 'URY' }],
    COL: [{ name: 'Venezuela', cca3: 'VEN' }, { name: 'Ecuador', cca3: 'ECU' }, { name: 'Panamá', cca3: 'PAN' }],
    JPN: [], CHN: [{ name: 'Rusia', cca3: 'RUS' }, { name: 'India', cca3: 'IND' }],
    IND: [{ name: 'Pakistán', cca3: 'PAK' }, { name: 'China', cca3: 'CHN' }],
    EGY: [{ name: 'Libia', cca3: 'LBY' }, { name: 'Sudán', cca3: 'SDN' }],
    NGA: [], ZAF: [], AUS: [], NZL: [],
  };

  countries: Country[] = [];
  borders: Country[] = [];
  myForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.myForm = this.fb.group({
      region:  ['', Validators.required],
      country: [{ value: '', disabled: true }, Validators.required],
      border:  [{ value: '', disabled: true }],
    });

    this.myForm.get('region')?.valueChanges.subscribe((region: string) => {
      this.countries = this.countriesByRegion[region] ?? [];
      this.borders = [];
      this.myForm.patchValue({ country: '', border: '' });
      const countryCtrl = this.myForm.get('country');
      this.countries.length > 0 ? countryCtrl?.enable() : countryCtrl?.disable();
      this.myForm.get('border')?.disable();
    });

    this.myForm.get('country')?.valueChanges.subscribe((cca3: string) => {
      this.borders = this.bordersByCountry[cca3] ?? [];
      this.myForm.patchValue({ border: '' });
      const borderCtrl = this.myForm.get('border');
      this.borders.length > 0 ? borderCtrl?.enable() : borderCtrl?.disable();
    });
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.getRawValue());
  }
}
