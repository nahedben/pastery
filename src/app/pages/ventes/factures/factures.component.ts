import { Component, OnInit } from '@angular/core';
import { Facture } from '../../../modelsInt/fact-clt-bc';
import { Router } from '@angular/router';
import { FactureService } from '../../../venteSrvices/facture.service';
import { Location } from '@angular/common';
import { EarningCardBackComponent } from '../../e-commerce/earning-card/back-side/earning-card-back.component';

@Component({
  selector: 'ngx-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.scss']
})
export class FacturesComponent implements OnInit {
  fcts: Facture[] = []
  lstfctsorted: Facture[] = []
  y: boolean = false
  facture: Facture = {};
  t: boolean = false

  constructor(private route: Router,
    private factService: FactureService,
    private _loction: Location) { }

  ngOnInit(): void {
    this.fetchData();


  }

  onBack() {
    this.t = false
  }


  sortByDate(F1: Facture, F2: Facture) {
    if (F1.dateFacture < F2.dateFacture) return 1
    else if (F1.dateFacture === F2.dateFacture) return 0
    else return -1
  }

  details(fct: Facture) {
    console.log(" la facture a envoyer", fct)

    this.t = true
    // this.factService.retreiveOneFacture(idfc).subscribe(data=>{
    //   this.facture = data;
    //   console.log("La fact A envoyer du bonton click: ", this.facture)
    // })
    this.facture = fct;

  }

  onDelete(id: number) {
    console.log("le id selectionné est :", id)


    if (window.confirm('Etes vous sure de vouloir supprimer cette Facture?'))
      this.factService.removeOneFacture(id).subscribe(data => {
        
          this.fetchData();
          this.t = false
        
      });


  }
  fetchData() {
    this.factService.retreiveAllFacture().subscribe(data => {
      this.lstfctsorted = data.sort(this.sortByDate);
    })
  }


  //   sortByClientName(F1:Facture,F2:Facture){

  //       if(F1.client.nom> F2.client.nom) return 1
  //       else if (F1.client.nom=== F2.client.nom) return 0
  //       else return -1

  // }


}
