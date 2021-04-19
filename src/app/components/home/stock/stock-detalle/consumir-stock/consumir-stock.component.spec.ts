import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumirStockComponent } from './consumir-stock.component';

describe('ConsumirStockComponent', () => {
  let component: ConsumirStockComponent;
  let fixture: ComponentFixture<ConsumirStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumirStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumirStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
