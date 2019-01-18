import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletListDisplayComponent } from './bullet-list-display.component';

describe('BulletListDisplayComponent', () => {
  let component: BulletListDisplayComponent;
  let fixture: ComponentFixture<BulletListDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletListDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
