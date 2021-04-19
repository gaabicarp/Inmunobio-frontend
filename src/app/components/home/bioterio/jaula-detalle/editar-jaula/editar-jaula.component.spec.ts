import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarJaulaComponent } from './editar-jaula.component';

describe('EditarJaulaComponent', () => {
  let component: EditarJaulaComponent;
  let fixture: ComponentFixture<EditarJaulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarJaulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarJaulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
