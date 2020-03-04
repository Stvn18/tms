import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotsDialogComponent } from './pilots-dialog.component';

describe('PilotsDialogComponent', () => {
  let component: PilotsDialogComponent;
  let fixture: ComponentFixture<PilotsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PilotsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PilotsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
