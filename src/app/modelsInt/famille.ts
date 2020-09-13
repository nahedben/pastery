import { MatierePremiere } from './matierePrem';

export interface IFamille{
    id: number;
    name?: string;
    details?:string;
    description?:string;
  
}

export class Famille{
    id?: number;
    name?: string;
    description?:string;
    imageUrl? : string;
    prodSaison?: number;
    prodSaisonAttein?:number;
    nbrProd?:number;

}