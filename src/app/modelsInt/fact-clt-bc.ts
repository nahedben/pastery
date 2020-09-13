import { Produit } from './Produit';

export class LigneFacture{
    id?:number;
    quantity?:number;
    totalPrice?:number;
    produit?:Produit;
    pfacture?:Facture;
}

export class Facture{
    id?:number;
    dateFacture?:Date;
    Factvalidation?:boolean;
    taxValue?:number;
    totalPriceTtc?:number;
    typePayment?:String;
    Regelement?:boolean;
    client?:Client;
}

export class Client{
    id?:number;
    dateCreation?:Date;
    nom?:string;
    prenom?:string;
    email?:string;
    phone?:string;
    address?:string;
    tax?:number;
    matriculeFiscal?:string;
    chiffreAchat?:number;
    credit?:number;
    note?:string;
    lastVisit?:string;

}

export class LigneBonCommande{
    id?:number;
    quantity?:number;
    totalLinePrice?:number;
    produit?:Produit;
    bonCommande?:BonCommande;
}

export class BonCommande{
    id?:number;
    dateCreation?:Date;
    dateSouhaite?:Date;
    dateLivraisonPrevisionnel?:Date;
    totalPric?:number;
    Avance?:number;
    RestPaye?:number;
    infoSupp?:string;
    tempsRestantLiv?:number;
    client?:Client;
}