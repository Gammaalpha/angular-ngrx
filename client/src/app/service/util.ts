import { formatCurrency, formatNumber } from "@angular/common";

export const formatValues = (value: string | number, key: string) => {
    switch (key) {
        case 'price':
            if (typeof value === 'number') {
                return formatCurrency(value, 'en', "$", "CAD", '3.2-2')
            }
            break;
        case 'kilometers':
            if (typeof value === 'number') {
                return formatNumber(value, 'en', '3.0-2')
            }
            break;
        default:
            break;
    }
    return value
}