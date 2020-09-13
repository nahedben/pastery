import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { NbIconLibraries } from "@nebular/theme";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Famille } from '../../../../modelsInt/famille';
import { MatierePremiere } from '../../../../modelsInt/matierePrem';
import { FamilleService } from '../../../../stockServices/famille.service';
import { MatpremService } from '../../../../stockServices/matprem.service';
import { RecetteServiceService } from '../../../../venteSrvices/recette-service.service';


import { switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { of, forkJoin } from 'rxjs';
@Component({
  selector: "ngx-addproduct",
  templateUrl: "./addproduct.component.html",
  styleUrls: ["./addproduct.component.scss"],
})
export class AddproductComponent implements OnInit, OnChanges {
  ligneRecetteForm: FormGroup;
  familles: any[] = [
    {
      id: 1,
      name: "Gâteau morceau",
      description: "Gâteau en morceau",
      prodSaison: 200,
      prodSaisonAttein: 140,
      nbrProd: null,
    },
    {
      id: 2,
      name: "Gâteau",
      description: "Gâteau",
      prodSaison: 100,
      prodSaisonAttein: 50,
      nbrProd: null,
    },
    {
      id: 3,
      name: "morceau",
      description: "morceau",
      prodSaison: 150,
      prodSaisonAttein: 60,
      nbrProd: null,
    },
    {
      id: 4,
      name: "Gâteau morceau",
      description: "Gâteau en morceau",
      prodSaison: 200,
      prodSaisonAttein: 140,
      nbrProd: null,
    },
  ];
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
  units: any[] = [
    { value: "NONE", label: "Aucun" },
    { value: "METER", label: "Par mètre" },
    { value: "KG", label: "En kilogramme" },
    { value: "LITER", label: "En litre" },
    { value: "PIECE", label: "Par piece" },
    { value: "UNIT", label: "Par Unité" },
  ];
  produit: any = {
    name: "",
    stocklm: "",
    SelectedFamily: {},
    unit: "",
    unitPrice: "",
  };
  recette: any = {
    designation: "",
    recettePour: "",
    dateCreation: "",
    lignesRecettes: [],
  };
  evaIcons = [];
  chevronR = "chevron-right";
  chevronL = "chevron-left";
  formTitle: String = "";
  @Input() produitToEdit: any;
  @Input() status: String;
  constructor(iconsLibrary: NbIconLibraries, private formBuilder: FormBuilder, private familleServ: FamilleService,
    private matPremServ: MatpremService,private recetteService:RecetteServiceService) {
    this.evaIcons = Array.from(iconsLibrary.getPack("eva").icons.keys()).filter(
      (icon) => icon.indexOf("outline") === -1
    );

    iconsLibrary.registerFontPack("ion", { iconClassPrefix: "ion" });
  }

  getAllFamilleExist() {
    this.familleServ.retreiveAllFam().subscribe(data => {
      this.familles = data
    })

  }

  getAllMatPremExis() {
    this.matPremServ.getMatPrem().subscribe(data => {
      this.matierePremier = data
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.produitToEdit);
    if (changes.produitToEdit.currentValue.status === "add") {
      this.formTitle = "ajouter des nouvelles produits";
      this.ligneRecetteForm = this.formBuilder.group({
        lignesRecettes: this.formBuilder.array([this.newRecetteLineBuilder()]),
      });
    }

    if (changes.produitToEdit.currentValue.status === "edit") {
      this.formTitle = "Editer le produit : " + changes.produitToEdit.currentValue.produit.name;

      this.produit.name = changes.produitToEdit.currentValue.produit.name;
      this.produit.stocklm = changes.produitToEdit.currentValue.produit.stockLimit;
      this.produit.SelectedFamily = this.familles.filter(
        (fam) => fam.id === changes.produitToEdit.currentValue.produit.famille.id
      )[0];
      this.produit.unit = changes.produitToEdit.currentValue.produit.unit;
      this.produit.unitPrice = changes.produitToEdit.currentValue.produit.unitPrice;

      
      this.recette.designation = changes.produitToEdit.currentValue.designation;
      this.recette.recettePour = changes.produitToEdit.currentValue.recettePour;
      this.ligneRecetteForm = this.formBuilder.group({
        lignesRecettes: this.formBuilder.array(changes.produitToEdit.currentValue.ligneRecette.map(ligne => this.formBuilder.group({
          matierepremier: [ligne.matierepremier.id, Validators.required],
          consommation: [ligne.consommation, Validators.required],
        })
             
        )),
      });
    }
  }
  ngOnInit(): void {
    this.getAllFamilleExist();
    this.getAllMatPremExis();
this.testing();

  }
  testing(){
   const switched = this.recetteService.getUserId()
    .pipe(switchMap((userResult) => forkJoin(
    [
      of(userResult),
      this.recetteService.getUserPermission(userResult.id),
      this.recetteService.getUserInfo(userResult.id)
    ]
  )));
  switched.map(results => ({
    id: results[0].id,
    name: results[0].name,
    permissions: results[1].permissions,
    info: results[2].info
  }))
  .subscribe(v => console.log('forkJoin:', v));
 
  }

  newRecetteLineBuilder(): FormGroup {
    return this.formBuilder.group({
      matierepremier: [null, Validators.required],
      consommation: [null, Validators.required],
    });
  }
   matierePremName (id:any){
     let parsedid;
   typeof id === 'string' ?parsedid =parseInt(id) : parsedid = id;
     return this.matierePremier.filter(matpP => matpP.id === parsedid)[0]?.name
   }
   matierePremUnit (id:any){
    let parsedid;
    typeof id === 'string' ?parsedid =parseInt(id) : parsedid = id;
    return this.matierePremier.filter(matpP => matpP.id === parsedid)[0]?.unit
  }
  get lignesRecettes() {
    return this.ligneRecetteForm.get("lignesRecettes") as FormArray;
  }
  addNewLineHandler() {
    this.lignesRecettes.push(this.newRecetteLineBuilder());
  }
  removeLineHandler() {
    this.lignesRecettes.removeAt(this.lignesRecettes.length - 1);
  }
  addHandler() {
    console.log("Forms", this.produit);
    console.log("Form lignes recettes", this.ligneRecetteForm.value);
    console.log("recettes", this.recette);
  }
}
