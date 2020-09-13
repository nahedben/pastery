import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BonCommandeService } from '../../../venteSrvices/bon-commande.service';
import { BonCommande } from '../../../modelsInt/fact-clt-bc';
import { runInThisContext } from 'vm';

@Component({
  selector: 'ngx-bon-commande',
  templateUrl: './bon-commande.component.html',
  styleUrls: ['./bon-commande.component.scss']
})
export class BonCommandeComponent implements OnInit {
lstbc: BonCommande[]=[]
y:boolean =false
t:boolean=false
bcmd: BonCommande={}

  constructor(private route: Router,
              private bonComServ: BonCommandeService) { }

  ngOnInit(): void {

    this.fetchData();   
  }


  sortByDate(Bc1: BonCommande, Bc2: BonCommande) {
    if (Bc1.dateSouhaite < Bc2.dateSouhaite) return 1
    else if (Bc1.dateSouhaite === Bc2.dateSouhaite) return 0
  
    else return -1
  }

  fetchData() {
   this.bonComServ.retreiveAllBonCommande().subscribe(data=>{
      this.lstbc= data.sort(this.sortByDate);
    })
  }


  onAjouter(){
    console.log(" Ajouter")
    this.t=true
  }
  onRetour2(){
    this.t=false
  }
  onDetails(bc:BonCommande){
  
    console.log('le bon est:',bc)
   
    // this.bonComServ.retreiveOneBonCommande(id).subscribe(data=>{
    //   this.bonCmd=data
    //   console.log( "Le bon a envoyer est:", this.bonCmd)
    // })
    this.bcmd=bc
    this.y=true;
  }
  onSupprimer(id:number){
    console.log("l'id a supprimer est: ", id)
    if (window.confirm('Etes vous sure de vouloir supprimer cette Facture?'))
    this.bonComServ.removeBc(id).subscribe(data=>{
      this.fetchData();

      
    })
  }

  onRetour(){
    this.y=false;
  }


}
