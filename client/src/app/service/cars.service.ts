import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarsService {
  apiUrl: string;
  constructor() {
    this.apiUrl = environment.apiUrl
  }

  getCarById(id: string) {
    return this.makeApiCall(`detail/${id}`);
  }

  getCarsList() {
    return this.makeApiCall('list');
  }

  makeApiCall(endpoint: string) {
    return ajax(`${this.apiUrl}/${endpoint}`).pipe(map(carsList => carsList.response), catchError((error: any) => {
      console.log('Error', error);
      return of(error)
    }))
  }
}
