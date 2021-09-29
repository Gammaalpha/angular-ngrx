import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DataActionTypes } from "../actions/data.action";
import { CarsService } from "../../service/cars.service";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class CarEffects {
    loadData$ = createEffect(
        () => this.actions$.pipe(
            ofType(DataActionTypes.GET_DATA),
            mergeMap(() => this.carsService.getCarsList().pipe(
                map((response) => ({ type: DataActionTypes.GET_DATA_SUCCESS, cars: response.data.cars })),
                catchError(() => of({ type: DataActionTypes.GET_DATA_ERROR }))
            )
            )
        )
    )

    constructor(
        private actions$: Actions,
        private carsService: CarsService
    ) { }
}