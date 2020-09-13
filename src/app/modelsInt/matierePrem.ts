import { Depot } from './depot'

export interface IMatierePrem {
    id?: number
    name?: string
    unit?: string
    quantity?: number
    stockLimit?: number
    purchaseUnitPrice?: number
    depot?: Depot
    famille?: string
}

export class MatierePremiere implements IMatierePrem{
    id?: number
    name?: string
    unit?: string
    quantity?: number
    stockLimit?: number
    purchaseUnitPrice?: number
    depot?:Depot
    // famille?: string


    }
    
