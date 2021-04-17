import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarStockComponent } from './agregar-stock.component';

describe('AgregarStockComponent', () => {
  let component: AgregarStockComponent;
  let fixture: ComponentFixture<AgregarStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
