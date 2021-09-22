import { createSelector } from "@ngrx/store";
import { FilterState } from "src/app/models/car";
import { AppState } from "../app.state";


export const selectFilter = (state: AppState) => state.filterState;

export const filterSelector = createSelector(
    selectFilter,
    (state: FilterState) => state.filter
)