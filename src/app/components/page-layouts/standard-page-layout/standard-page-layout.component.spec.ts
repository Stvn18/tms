import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardPageLayoutComponent } from './standard-page-layout.component';

describe('StandardPageLayoutComponent', () => {
  let component: StandardPageLayoutComponent;
  let fixture: ComponentFixture<StandardPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardPageLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
