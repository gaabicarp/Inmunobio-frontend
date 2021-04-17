import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BioterioComponent } from './bioterio.component';

describe('BioterioComponent', () => {
  let component: BioterioComponent;
  let fixture: ComponentFixture<BioterioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioterioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioterioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
