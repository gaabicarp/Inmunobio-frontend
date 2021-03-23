import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetalleComponent } from './stock-detalle.component';

describe('StockDetalleComponent', () => {
  let component: StockDetalleComponent;
  let fixture: ComponentFixture<StockDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
