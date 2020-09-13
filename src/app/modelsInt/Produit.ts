import { Famille } from './famille';
import { LigneRecette } from './ligne-recette';
import { Recette } from './recette';
import { MatierePremiere } from './matierePrem';

export class Produit{
    id?: number;
    name?:string;
    unit?:string;
    quantity?:number;
    stockLimit?:number;
    unitPrice?:number;
    percentageMargin?:number;
    unitPriceValidation?:boolean;
    prodCoast?:number;
    famille? :Famille;
    photo?: any;

}

    export class  CompletProduit{
     rc?: Recette;
     pr?:Produit ;
     lg?: LigneRecette[];
    }

    
    export class LigneRecetMatPre{
    lg?:LigneRecette ;
     mat?: MatierePremiere;
    }

    export class OrdreProduction{
    id?: number;
    created?:Date;
    debutProd?:boolean;
    stockupdate?: boolean;
    dateLancement?:Date;
    prodFinish?:boolean;
    sortieProd?:Date;
    tempsPrd?:number;
    quantity?:number;
    qtSortieProd?:number;
    SortiePrevisionnel?:Date;
    recette?: Recette;}