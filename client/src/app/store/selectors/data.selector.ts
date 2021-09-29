import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CarsDataState } from "src/app/models/car";

export const selectFeature = createFeatureSelector<CarsDataState>('data');

export const selectFeatureCarsData = createSelector(
    selectFeature,
    state => state.cars
)