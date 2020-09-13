import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { BonCommande, LigneBonCommande } from '../../../../modelsInt/fact-clt-bc';
import { Router } from '@angular/router';
import { BonCommandeService } from '../../../../venteSrvices/bon-commande.service';


@Component({
  selector: 'ngx-bc-details',
  templateUrl: './bc-details.component.html',
  styleUrls: ['./bc-details.component.scss']
})
export class BcDetailsComponent implements OnInit, OnChanges {

  @Input()
  bc: BonCommande

  lstLignBoncmd: LigneBonCommande[] = []

  constructor(private route: Router,
    private boncmdService: BonCommandeService) { }

    
  ngOnChanges(changes: SimpleChanges) {
    console.log("on changes taset", changes.bc)
    if (changes.bc.currentValue !== undefined || changes.bc.currentValue !== changes.bc.previousValue) {
      console.log("lebon recu est ", this.bc.id)
      this.boncmdService.retreiveAllLigneOfBc(this.bc.id).subscribe(data => {
        this.lstLignBoncmd = data
        console.log("la liste de la liste est ", this.lstLignBoncmd)
      })
    }
  }
  ngOnInit(): void {




  }

}
