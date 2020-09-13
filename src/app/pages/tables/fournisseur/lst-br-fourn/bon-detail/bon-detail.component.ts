import { Component, OnInit, Input } from '@angular/core';
import { BonReception } from '../../../../../modelsInt/bonReception';
import { Router } from '@angular/router';
import { BonReceptionService } from '../../../../../stockServices/bon-reception.service';
import { LigneBonReceptionService } from '../../../../../stockServices/ligne-bon-Reception.service';
import { LigneBonReception } from '../../../../../modelsInt/ligneBonReception';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'ngx-bon-detail',
  templateUrl: './bon-detail.component.html',
  styleUrls: ['./bon-detail.component.scss']
})
export class BonDetailComponent implements OnInit {
@Input()
bonrecep :BonReception={}

  lstLgbr: LigneBonReception[]=[]

  constructor(private router: Router,
    private SerBonrecep: BonReceptionService,
    private servLigneBonRecep: LigneBonReceptionService) { }

  ngOnInit(): void {
    console.log(" Le id du fils est"+this.bonrecep.numBonRecep)
    this.servLigneBonRecep.retreiveAllLbrFronBr(this.bonrecep.id).subscribe(data=>{
this.lstLgbr=data
console.log("lst de ligne",this.lstLgbr)
    })


  }




}
