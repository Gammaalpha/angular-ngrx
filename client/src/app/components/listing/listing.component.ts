import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { CarsService } from 'src/app/service/cars.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from 'src/app/models/car';
import { formatValues } from 'src/app/service/util';
import { Store } from '@ngrx/store';
import { filterUpdateAction } from 'src/app/store/actions/filter.action';
import { selectFeatureFilter } from 'src/app/store/selectors/filter.selector';
import { DataActionTypes } from 'src/app/store/actions/data.action';
import { selectFeatureCarsData } from 'src/app/store/selectors/data.selector';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements AfterViewInit {

  filterInput: string = '';
  initCol: any = [
    { key: "id", text: "ID" },
    { key: "year", text: "Year" },
    { key: "make", text: "Make" },
    { key: "model", text: "Model" },
    { key: "kilometers", text: "Kilometers" },
    { key: "price", text: "Price" },
    { key: "detail", text: "Details" },

  ];
  displayedColumns: string[] = this.initCol.map((col: any) => col.key)

  dataSource: MatTableDataSource<Car[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  carsService = new CarsService();
  carsData: Car[];

  constructor(private store: Store) {
    this.carsData = [];
    this.dataSource = new MatTableDataSource();

    this.store.dispatch({ type: DataActionTypes.GET_DATA })
  }

  customCellFormat(value: string | number, key: string) {
    return formatValues(value, key)
  }

  applyFilter() {
    const filterValue = this.filterInput;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.store.dispatch(filterUpdateAction({ filterValue: filterValue.trim() }))
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.applyFilter()
  }

  ngOnInit(): void {



    this.store.select(selectFeatureCarsData)
      .pipe(
        map((cars: any) => {
          this.dataSource.data = cars;
        }),
        switchMap(() => {
          return this.store.select(selectFeatureFilter)
            .pipe(map(filter => {
              this.filterInput = filter
            }))
        })
      )
      .subscribe()
  }

}
