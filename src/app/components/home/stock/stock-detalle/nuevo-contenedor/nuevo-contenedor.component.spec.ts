import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoContenedorComponent } from './nuevo-contenedor.component';

describe('NuevoContenedorComponent', () => {
  let component: NuevoContenedorComponent;
  let fixture: ComponentFixture<NuevoContenedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoContenedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoContenedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
