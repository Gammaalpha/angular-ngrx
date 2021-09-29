import { createReducer, on } from "@ngrx/store";
import { Car, CarsDataState } from "src/app/models/car";
import { getDataAction, getDataActionSuccess } from "../actions/data.action";

const initialState: CarsDataState = {
    cars: []
};

export const dataReducer = createReducer(
    initialState,
    on(getDataAction, () => initialState),
    on(getDataActionSuccess, (state, payload: any) => ({ ...state, cars: payload.cars }))
)