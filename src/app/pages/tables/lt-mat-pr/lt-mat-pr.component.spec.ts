import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LtMatPrComponent } from './lt-mat-pr.component';

describe('LtMatPrComponent', () => {
  let component: LtMatPrComponent;
  let fixture: ComponentFixture<LtMatPrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LtMatPrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LtMatPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
