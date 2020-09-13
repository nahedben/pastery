import { MatierePremiere } from './matierePrem';
import { IBonReception, BonReception } from './bonReception';

export interface ILigneBonReception {
    id?:number;
    quantity? :number;
    total? :number;
    qtyInserted:boolean;
    totalAffected: boolean;
    matierepremier?:MatierePremiere;
    bonReception?:BonReception;
    
}
export class LigneBonReception {
    id?:number;
    quantity? :number;
    total? :number;
    qtyInserted?:boolean;
    totalAffected?: boolean;
    matierepremier?:MatierePremiere;
    bonReception?:BonReception;

}