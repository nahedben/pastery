import { Component, OnInit, Input } from '@angular/core';
import { threadId } from 'worker_threads';

@Component({
  selector: 'ngx-ligne-recette',
  templateUrl: './ligne-recette.component.html',
  styleUrls: ['./ligne-recette.component.scss']
})
export class LigneRecetteComponent implements OnInit {
  matierePremier: any[] = [
    {
      id: 9,
      name: "Maisene",
      unit: "KG",
      quantity: 49.0,
      stockLimit: 10.0,
      purchaseUnitPrice: 5.0,
      depot: null,
      famille: null,
    },
    {
      id: 7,
      name: "sucre poudre",
      unit: "KG",
      quantity: 99.66,
      stockLimit: 50.0,
      purchaseUnitPrice: 1.2,
      depot: null,
      famille: null,
    },
    {
      id: 6,
      name: "farine",
      unit: "KG",
      quantity: 198.33,
      stockLimit: 1.0,
      purchaseUnitPrice: 0.5,
      depot: {
        id: 4,
        name: "Etagere produit sec",
        details: "detiner pour les produit emballe",
        location: "local Production",
        capacity: 300.0,
        actualCharge: 0.0,
      },
      famille: {
        id: 3,
        name: "Farines",
        description: null,
      },
    },
  ];
  @Input() ligneRecette: any = { id:0,consommation: "", matierepremier: {} };
  @Input() index:any;
  constructor() { }

  ngOnInit(): void {
    this.ligneRecette.id = this.index +1 ; 
  }

}
