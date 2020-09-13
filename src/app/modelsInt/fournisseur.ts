export interface IFournisseur{
    id:number;
    dateCreation?:Date;
    name?:string;
    email?:string;
    phone?:string;
    address?:string;
    compte?:number;
    tax?:number;
    contactName?:string;
    note?:string;
}
export class Fournisseur{
    id?:number;
    dateCreation?:string;
    name?:string;
    email?:string;
    phone?:any;
    address?:string;
    compte?:number;
    tax?:number;
    contactName?:string;
    note?:string;
}