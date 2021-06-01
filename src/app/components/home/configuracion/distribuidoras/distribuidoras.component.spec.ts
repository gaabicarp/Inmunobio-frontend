import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuidorasComponent } from './distribuidoras.component';

describe('DistribuidorasComponent', () => {
  let component: DistribuidorasComponent;
  let fixture: ComponentFixture<DistribuidorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistribuidorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribuidorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
