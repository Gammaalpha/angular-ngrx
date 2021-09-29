import { dataReducer } from "./data.reducer";
import { filterReducer } from "./filter.reducer";

export const combinedReducers = {
    filter: filterReducer,
    data: dataReducer
}