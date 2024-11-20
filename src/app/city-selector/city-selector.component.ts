import { NgFor } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CityDataService } from '../_services/city-data.service';
import { City } from '../_models/city';

@Component({
  selector: 'app-city-selector',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './city-selector.component.html',
  styleUrl: './city-selector.component.css',
})
export class CitySelectorComponent implements OnInit {
  private cityDataService = inject(CityDataService);
  private fb = inject(FormBuilder);
  cityForm: FormGroup = new FormGroup({});
  @Output() citySelected = new EventEmitter<string>();

  cities = [
    'Berlin',
    'Paris',
    'Madrid',
    'Rome',
    'London',
    'Cairo',
    'New Delhi',
  ];

  cityData: any;
  isSubmitted = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.cityForm = this.fb.group({
      city: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    const selectedCity = this.cityForm.value.city;
    console.log(selectedCity);
    this.citySelected.emit(selectedCity);
    this.getCityData(selectedCity);
  }

  getCityData(city: string) {
    this.cityDataService.getCityData(city).subscribe({
      next: (data) => {
        this.cityData = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }
}
