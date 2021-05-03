import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaBlogComponent } from './entrada-blog.component';

describe('EntradaBlogComponent', () => {
  let component: EntradaBlogComponent;
  let fixture: ComponentFixture<EntradaBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradaBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
