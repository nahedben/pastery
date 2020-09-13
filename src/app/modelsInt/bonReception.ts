import { IFournisseur, Fournisseur } from './fournisseur';

export interface IBonReception{
    id:number;
    numBonRecep?:string;
    dateBr?:Date;
    nomLivreur?:string ;
    matLivreur?:string;
    note?:string;
    montTotHt?:number;
    montTotTtc?:number;
    fournisseur?:IFournisseur;
}
export class BonReception{
    id?:number;
    numBonRecep?:string;
    dateBr?:any;
    nomLivreur?:string ;
    matLivreur?:string;
    note?:string;
    montTotHt?:number;
    montTotTtc?:number;
    fournisseur?:Fournisseur;

}