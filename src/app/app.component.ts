import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'city-picker';
  city: any;

  ngOnInit(): void {
    this.http.get('https://api.zippopotam.us/de/10245').subscribe({
      next: (response) => (this.city = response),
      error: (err) => console.error(err),
      complete: () => console.log('done'),
    });
  }
}
