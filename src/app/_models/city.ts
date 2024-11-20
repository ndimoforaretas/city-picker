export interface City {
  'post code': string;
  country: string;
  'country abbreviation': string;
  places: Place[];
}

export interface Place {
  'place name': string;
  longitude: string;
  state: string;
  'state abbreviation': string;
  latitude: string;
}
