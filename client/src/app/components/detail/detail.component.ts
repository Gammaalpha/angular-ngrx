import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/operators';
import { Car } from 'src/app/models/car';
import { CarsService } from 'src/app/service/cars.service';
import { formatValues } from 'src/app/service/util';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DetailComponent implements OnInit {

  carsService = new CarsService();
  carDetail: Car = {
    id: '',
    year: 0,
    make: '',
    model: '',
    description: '',
    kilometers: 0,
    price: 0,
    images: []
  };
  loading: boolean;
  constructor(private route: ActivatedRoute) {
    this.loading = false
  }

  customFormat(value: string | number, key: string) {
    return formatValues(value, key)
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.loading = true;
          const idVal = params.get('id');
          if (idVal) {
            return this.carsService.getCarById(idVal)
          }
          return of(false)
        }),
        map(res => {
          Object.assign(this.carDetail, res.data.car)
          this.loading = true
        })
      )
      .subscribe()
  }

}
