import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Facture, LigneFacture } from '../../../../modelsInt/fact-clt-bc';
import { LigneFactureService } from '../../../../venteSrvices/ligne-facture.service';

@Component({
  selector: 'ngx-fact-detail',
  templateUrl: './fact-detail.component.html',
  styleUrls: ['./fact-detail.component.scss']
})
export class FactDetailComponent implements OnInit {
@Input()
facture: Facture

lstLgFct:LigneFacture[]=[]
  constructor(private route : Router,
              private lgnService: LigneFactureService) { }

  ngOnInit(): void {
    console.log("le id facture recu"+ this.facture.id)
    // this.lstLgFct=[]
    this.lgnService.retreiveAllLignFactFromFct(this.facture.id).subscribe(data=>{
      this.lstLgFct= data
      })
  }

}
