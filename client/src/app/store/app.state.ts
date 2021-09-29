import { FilterState, CarsDataState } from "../models/car";

export interface AppState {
    filter: FilterState,
    data: CarsDataState
}