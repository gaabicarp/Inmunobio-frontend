import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoBlogProyectoComponent } from './nuevo-blog-proyecto.component';

describe('NuevoBlogProyectoComponent', () => {
  let component: NuevoBlogProyectoComponent;
  let fixture: ComponentFixture<NuevoBlogProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoBlogProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoBlogProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
