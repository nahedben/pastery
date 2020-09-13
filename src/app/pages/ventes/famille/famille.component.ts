import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Famille } from '../../../modelsInt/famille';
import { FamilleService } from '../../../stockServices/famille.service';
import { ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';
import { Produit } from '../../../modelsInt/Produit';


@Component({
  selector: 'ngx-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.scss']
})
export class FamilleComponent implements OnInit {
// @Output() 
// affichHandlerX: EventEmitter<boolean> =new EventEmitter<boolean>();
@Output() 
affichHandlerY: EventEmitter<boolean> =new EventEmitter<boolean>();

@Output()
sendIdToprinc: EventEmitter<number> =new EventEmitter<number>();



  

y:boolean =false

  id:number =0;
nbr: number =0;
famille: Famille={};
familles: Famille[]=[];
len: number =0;
firstPartUrl: string='assets/images/';
fam:Famille = {};
nbrCalcul:number = 0;

imageUrl: string ='';
lstPrd: Produit[]=[];
  constructor(private famService: FamilleService,
              private route : ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.retreiveFamilles();
   
    
  }
  retreiveFamilles(){
    this.famService.retreiveAllFam().subscribe(data=> {
      this.familles=data;
      console.log(this.famille);
      
    })}

    onclicked(event,id){
      console.log("hide clicked"+event+"le id : "+id);
      
      this.y=true;
      this.affichHandlerY.emit(this.y)
      this.sendIdToprinc.emit(id)
     
    }
     
}