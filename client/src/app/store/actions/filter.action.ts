import { createAction, props } from '@ngrx/store';

export enum FilterActionTypes {
    UPDATE_FILTER = '[FILTER] Update',
    UPDATE_FILTER_SUCCESS = '[FILTER] Update Success'
}

export const filterUpdateAction = createAction(
    FilterActionTypes.UPDATE_FILTER,
    props<{ filterValue: string }>()
);

