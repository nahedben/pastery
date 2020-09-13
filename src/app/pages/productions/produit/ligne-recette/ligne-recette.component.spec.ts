import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneRecetteComponent } from './ligne-recette.component';

describe('LigneRecetteComponent', () => {
  let component: LigneRecetteComponent;
  let fixture: ComponentFixture<LigneRecetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneRecetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
