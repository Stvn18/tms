import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardDialogLayoutComponent } from './standard-dialog-layout.component';

describe('StandardDialogLayoutComponent', () => {
  let component: StandardDialogLayoutComponent;
  let fixture: ComponentFixture<StandardDialogLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardDialogLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardDialogLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
