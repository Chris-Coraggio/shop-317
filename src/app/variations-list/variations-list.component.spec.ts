import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationsListComponent } from './variations-list.component';

describe('VariationsListComponent', () => {
  let component: VariationsListComponent;
  let fixture: ComponentFixture<VariationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
