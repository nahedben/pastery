import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbThemeService, NbWindowService } from '@nebular/theme';
import { ProduitService } from '../../../venteSrvices/produit.service';
import { FamilleService } from '../../../stockServices/famille.service';
import { Famille } from '../../../modelsInt/famille';
import { MatpremService } from '../../../stockServices/matprem.service';
import { MatierePremiere } from '../../../modelsInt/matierePrem';
import { OrdreProductionService } from '../../../venteSrvices/ordre-production.service';
import { RecetteServiceService } from '../../../venteSrvices/recette-service.service';
import { OrdreProduction } from '../../../modelsInt/Produit';
@Component({
  selector: 'ngx-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {
  currentTheme: string;
  themeSubscription: any;
  openProductForm: boolean = false;
  produits: any[] = []
  produitToEdit: any;

  statuses: NbComponentStatus = 'info';
  ajouterProduitBtnLabel: String = 'Ajouter Produit';
  btnComanderStatus: NbComponentStatus = 'success';
  btnComanderShape: NbComponentShape = 'round';
  btnComanderSize: NbComponentSize = 'small';

  btnRecetteStatus: NbComponentStatus = 'primary';
  btnRecetteShape: NbComponentShape = 'round';
  btnRecetteSize: NbComponentSize = 'small';
  btnCloseRecetteStatus: NbComponentStatus = 'danger';
  btnCloseRecetteShape: NbComponentShape = 'round';
  btnCloseRecetteSize: NbComponentSize = 'small';
  quantite: number = 0;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  constructor(private themeService: NbThemeService, private windowService: NbWindowService, private produitService: ProduitService,
    private familleServ: FamilleService,
    private matPremServ: MatpremService, private orderProdService: OrdreProductionService, private recetteService: RecetteServiceService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }
  openFormHandler() {
    this.produitToEdit = { status: 'add' };
    if (!this.openProductForm) {
      this.openProductForm = true
      this.statuses = 'danger';
      this.ajouterProduitBtnLabel = "Fermer l'ajout"
    } else {
      this.statuses = 'info';
      this.ajouterProduitBtnLabel = "Ajouter Produit"
      this.openProductForm = false
    }
  }
  editerAction(prod) {
    this.produitToEdit = { ...prod, status: 'edit' };
    this.openProductForm = true
    this.statuses = 'danger';
    this.ajouterProduitBtnLabel = "Fermer la configuration"


  }
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.recetteService.retreiveAllRecette().subscribe((data) => {
      const array: any[] = data
      this.produits = array.map(elm => {
        return { ...elm, photo: "https://files.meilleurduchef.com/mdc/photo/recette/gateau-anges-surprise/gateau-anges-surprise-640.jpg", showRecette: false }

      }).reverse();

      console.log(array)
    })
  }

  showRecetteHandler(prod) {
    this.produits.map(product => {
      prod.id === product.id ? product.showRecette = true : null;
    })
  }
  closeRecetteHandler(prod) {
    this.produits.map(product => {
      prod.id === product.id ? product.showRecette = false : null;
    })
  }

  openWindow(contentTemplate, produit) {

    this.windowService.open(
      contentTemplate,
      {
        title: "ordre de production pour " + produit.produit.name,
        context: {

          produit: produit
        },
      },
    );

  }
  orderProdHandler(prod) {
    console.log("ORDRE PROD", prod, this.quantite)
    let orderProduction:any={quantity:this.quantite,recette:prod}
     this.orderProdService.createOrdreProductionAssigneRec(orderProduction).subscribe(data => {
       console.log(data)
     })

  }

}
