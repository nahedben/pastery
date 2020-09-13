import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { LigneBonCommande } from '../../../../../modelsInt/fact-clt-bc';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-lst-ligne-bc',
  templateUrl: './lst-ligne-bc.component.html',
  styleUrls: ['./lst-ligne-bc.component.scss']
})
export class LstLigneBcComponent implements OnInit {
@Input()
lstLigBC: LigneBonCommande[]

@Output() removeLigneBonRecept: EventEmitter<LigneBonCommande[]> = new EventEmitter<LigneBonCommande[]>();

constructor(private route : Router) { }

  ngOnInit(): void {

    this.lstLigBC;
  }

  removeLigne(lignBC: LigneBonCommande){
    for(let lg of this.lstLigBC){
      if(lg===lignBC){
        this.lstLigBC.splice(this.lstLigBC.indexOf(lg),1)
    
break;
      }
      console.log("La nouvelle liste est ",this.lstLigBC)    
    }
    console.log(" a effache la ligne ",lignBC)
    this.removeLigneBonRecept.emit(this.lstLigBC);
  }




}
