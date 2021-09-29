import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FilterState } from "src/app/models/car";


export const selectFeature = createFeatureSelector<FilterState>('filter');

export const selectFeatureFilter = createSelector(
    selectFeature,
    state => state.filter
)