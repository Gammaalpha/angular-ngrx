import { createAction, props } from '@ngrx/store';
import { Car } from 'src/app/models/car';

export enum DataActionTypes {
    GET_DATA = "[DATA] Get Data",
    GET_DATA_SUCCESS = "[DATA SUCCESS] Get Data Success",
    GET_DATA_ERROR = "[DATA ERROR] Get Data failure"
}

export const getDataAction = createAction(DataActionTypes.GET_DATA)

export const getDataActionSuccess = createAction(DataActionTypes.GET_DATA_SUCCESS, props<{ cars: Car[] }>());