import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaDistribuidoraComponent } from './nueva-distribuidora.component';

describe('NuevaDistribuidoraComponent', () => {
  let component: NuevaDistribuidoraComponent;
  let fixture: ComponentFixture<NuevaDistribuidoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaDistribuidoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaDistribuidoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
