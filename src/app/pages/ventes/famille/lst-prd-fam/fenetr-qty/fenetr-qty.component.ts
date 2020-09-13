import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
// import { EventEmitter } from 'events';

@Component({
  selector: 'ngx-fenetr-qty',
  templateUrl: './fenetr-qty.component.html',
  styleUrls: ['./fenetr-qty.component.scss']
})
export class FenetrQtyComponent implements OnInit {
qty:number =0;
@Output() qtyTosend =new EventEmitter<number>();
  constructor(private windowRef : NbWindowRef) { }

  ngOnInit(): void {
  }
  onSubmit(qt: number){
    console.log("la quantite entre est:",this.qty)
    this.qtyTosend.emit(qt);
    console.log("La quantite a emettre:",qt)
    this.windowRef.close();
  }
  // close() {
  //   this.windowRef.close();
  // }

}
