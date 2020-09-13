import { MatierePremiere } from './matierePrem';
import { Recette } from './recette';

export class LigneRecette{

     id? : number;

     consommation?:number;

     coastLine?:number;

     matierepremier?: MatierePremiere

     recette?: Recette;
}