import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { City } from '../_models/city';

@Injectable({
  providedIn: 'root',
})
export class CityDataService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  cityData: any;

  private getCountryCode(city: string): string {
    const countryCodes: { [key: string]: string } = {
      Berlin: 'de',
      Paris: 'fr',
      Madrid: 'es',
      Rome: 'it',
      London: 'gb',
      Cairo: 'eg',
      'New Delhi': 'in',
    };
    return countryCodes[city];
  }

  private getZipCode(city: string): string {
    const zipCodes: { [key: string]: string } = {
      Berlin: '10115',
      Paris: '75001',
      Madrid: '28001',
      Rome: '00118',
      London: 'EC1A',
      Cairo: '11511',
      'New Delhi': '110001',
    };
    return zipCodes[city];
  }

  getCityData(city: string) {
    const countryCode = this.getCountryCode(city);
    const zipCode = this.getZipCode(city);
    const apiUrl = `${this.baseUrl}${countryCode}/${zipCode}`;
    return this.http.get<City>(apiUrl);
  }
}
