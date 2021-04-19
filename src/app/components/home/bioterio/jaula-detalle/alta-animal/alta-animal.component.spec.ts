import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaAnimalComponent } from './alta-animal.component';

describe('AltaAnimalComponent', () => {
  let component: AltaAnimalComponent;
  let fixture: ComponentFixture<AltaAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
