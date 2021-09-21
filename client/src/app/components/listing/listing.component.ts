import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { CarsService } from 'src/app/service/cars.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from 'src/app/models/car';
import { formatCurrency, formatNumber } from '@angular/common';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements AfterViewInit {
  initCol: any = [
    { key: "id", text: "ID" },
    { key: "year", text: "Year" },
    { key: "make", text: "Make" },
    { key: "model", text: "Model" },
    { key: "kilometers", text: "Kilometers" },
    { key: "price", text: "Price" },
  ];
  displayedColumns: string[] = this.initCol.map((col: any) => col.key)

  dataSource: MatTableDataSource<Car[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  loading: boolean;
  carsService = new CarsService();
  carsData: any[];
  constructor() {
    this.loading = false;
    this.carsData = [];
    this.dataSource = new MatTableDataSource();
  }

  formatColumnValues(value: string | number, key: string) {
    switch (key) {
      case 'price':
        if (typeof value === 'number') {
          return formatCurrency(value, 'en', "$", "CAD", '3.2-2')
        }
        break;
      case 'kilometers':
        if (typeof value === 'number') {
          return formatNumber(value, 'en', '3.0-2')
        }
        break;
      default:
        break;
    }
    return value
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.carsService.getCarsList()
      .pipe(map(((carsData: any) => {
        this.dataSource.data = carsData.data.cars;
      }))).subscribe()
  }

}
