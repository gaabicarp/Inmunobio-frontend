import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividirGrupoComponent } from './dividir-grupo.component';

describe('DividirGrupoComponent', () => {
  let component: DividirGrupoComponent;
  let fixture: ComponentFixture<DividirGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividirGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividirGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
