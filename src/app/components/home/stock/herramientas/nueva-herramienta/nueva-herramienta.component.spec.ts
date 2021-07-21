import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaHerramientaComponent } from './nueva-herramienta.component';

describe('NuevaHerramientaComponent', () => {
  let component: NuevaHerramientaComponent;
  let fixture: ComponentFixture<NuevaHerramientaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaHerramientaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
