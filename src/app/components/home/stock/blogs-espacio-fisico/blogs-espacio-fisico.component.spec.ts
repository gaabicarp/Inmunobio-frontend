import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsEspacioFisicoComponent } from './blogs-espacio-fisico.component';

describe('BlogsEspacioFisicoComponent', () => {
  let component: BlogsEspacioFisicoComponent;
  let fixture: ComponentFixture<BlogsEspacioFisicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsEspacioFisicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsEspacioFisicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
