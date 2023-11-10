import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupoComponent } from './signupo.component';

describe('SignupoComponent', () => {
  let component: SignupoComponent;
  let fixture: ComponentFixture<SignupoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupoComponent]
    });
    fixture = TestBed.createComponent(SignupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
