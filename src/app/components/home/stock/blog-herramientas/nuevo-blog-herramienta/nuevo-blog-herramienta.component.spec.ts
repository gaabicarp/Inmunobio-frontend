import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoBlogHerramientaComponent } from './nuevo-blog-herramienta.component';

describe('NuevoBlogHerramientaComponent', () => {
  let component: NuevoBlogHerramientaComponent;
  let fixture: ComponentFixture<NuevoBlogHerramientaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoBlogHerramientaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoBlogHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
