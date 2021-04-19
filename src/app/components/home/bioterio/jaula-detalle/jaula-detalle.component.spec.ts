import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JaulaDetalleComponent } from './jaula-detalle.component';

describe('JaulaDetalleComponent', () => {
  let component: JaulaDetalleComponent;
  let fixture: ComponentFixture<JaulaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JaulaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JaulaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
