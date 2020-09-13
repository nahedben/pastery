import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonDetailComponent } from './bon-detail.component';

describe('BonDetailComponent', () => {
  let component: BonDetailComponent;
  let fixture: ComponentFixture<BonDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
