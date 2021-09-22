import { AfterViewInit, Component, ViewChild, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { CarsService } from 'src/app/service/cars.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from 'src/app/models/car';
import { formatValues } from 'src/app/service/util';
import { Store } from '@ngrx/store';
import { filterUpdateAction } from 'src/app/store/actions/filter.action';
import { selectFilter } from 'src/app/store/selectors/filter.selector';
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
    { key: "detail", text: "Details", render: () => "link" },

  ];
  displayedColumns: string[] = this.initCol.map((col: any) => col.key)

  dataSource: MatTableDataSource<Car[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  loading: boolean;
  carsService = new CarsService();
  carsData: Car[];

  constructor(private store: Store) {
    this.loading = false;
    this.carsData = [];
    this.dataSource = new MatTableDataSource();
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
  }

  ngOnInit(): void {
    this.carsService.getCarsList()
      .pipe(map(((carsData: any) => {
        this.dataSource.data = carsData.data.cars;
      }))).subscribe()
  }

  ngAfterContentInit(): void {
    this.store.select((store: any) => store).pipe(map(currState => {
      console.log(currState.state.filter);
      this.filterInput = currState.state.filter;

    })).subscribe()
  }

}
