import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaciosfisicosComponent } from './espaciosfisicos.component';

describe('EspaciosfisicosComponent', () => {
  let component: EspaciosfisicosComponent;
  let fixture: ComponentFixture<EspaciosfisicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaciosfisicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaciosfisicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
