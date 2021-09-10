import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEspacioHerramientaComponent } from './blog-espacio-herramienta.component';

describe('BlogEspacioHerramientaComponent', () => {
  let component: BlogEspacioHerramientaComponent;
  let fixture: ComponentFixture<BlogEspacioHerramientaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogEspacioHerramientaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEspacioHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
