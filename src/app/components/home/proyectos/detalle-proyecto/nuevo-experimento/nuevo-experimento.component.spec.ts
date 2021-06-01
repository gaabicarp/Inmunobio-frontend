import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoExperimentoComponent } from './nuevo-experimento.component';

describe('NuevoExperimentoComponent', () => {
  let component: NuevoExperimentoComponent;
  let fixture: ComponentFixture<NuevoExperimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoExperimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoExperimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
