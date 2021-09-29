import { AppState } from "../store/app.state";

export interface Car {
    id: string,
    year: number,
    make: string,
    model: string,
    description: string,
    kilometers: number,
    price: number,
    images: string[]
}

export interface FilterState {
    filter: string
}

export interface CarsDataState {
    cars: Car[]
}