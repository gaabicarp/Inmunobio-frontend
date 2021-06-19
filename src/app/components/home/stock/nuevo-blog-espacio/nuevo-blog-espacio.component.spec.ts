import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoBlogEspacioComponent } from './nuevo-blog-espacio.component';

describe('NuevoBlogEspacioComponent', () => {
  let component: NuevoBlogEspacioComponent;
  let fixture: ComponentFixture<NuevoBlogEspacioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoBlogEspacioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoBlogEspacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
