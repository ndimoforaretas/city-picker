import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { CityDataService } from './_services/city-data.service';
import { CitySelectorComponent } from './city-selector/city-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, CitySelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private cityDataService = inject(CityDataService);
  title = 'city-picker';
  city: any;
  errorMessage: string | null = null;

  ngOnInit(): void {
    // Initial data fetch if needed
  }

  onCitySelected(city: string) {
    this.cityDataService.getCityData(city).subscribe({
      next: (response) => {
        this.city = response;
        this.errorMessage = null;
      },
      error: (err) => {
        console.error(err);
        this.city = null;
        this.errorMessage = 'City data not found. Please try another city.';
      },
      complete: () => console.log('done'),
    });
  }
}
