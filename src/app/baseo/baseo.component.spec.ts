import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseoComponent } from './baseo.component';

describe('BaseoComponent', () => {
  let component: BaseoComponent;
  let fixture: ComponentFixture<BaseoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseoComponent]
    });
    fixture = TestBed.createComponent(BaseoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
