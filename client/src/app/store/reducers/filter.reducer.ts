import { Action, createReducer, on } from '@ngrx/store';
import { FilterState } from "src/app/models/car";
import { filterUpdateAction } from "../actions/filter.action";
import { AppState } from '../app.state';

const initialState: FilterState = {
    filter: ''
}

export const filterReducer = createReducer(
    initialState,
    on(filterUpdateAction, (state, payload) => ({ ...state, filter: payload.filterValue }))
)