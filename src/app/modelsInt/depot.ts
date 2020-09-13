export interface Idepot{
    id?: number;
    name?: string;
    details?:string;
    location?:string;
    capacity?:number;
    actualCharge?:number;
    
}

export class Depot implements Idepot{
    id?: number;
    name?: string;
    details?:string;
    location?:string;
    capacity?:number;
    actualCharge?:number;
}