import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleExperimentosComponent } from './detalle-experimentos.component';

describe('DetalleExperimentosComponent', () => {
  let component: DetalleExperimentosComponent;
  let fixture: ComponentFixture<DetalleExperimentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleExperimentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleExperimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
