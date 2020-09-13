import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstLigneBcComponent } from './lst-ligne-bc.component';

describe('LstLigneBcComponent', () => {
  let component: LstLigneBcComponent;
  let fixture: ComponentFixture<LstLigneBcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstLigneBcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstLigneBcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
