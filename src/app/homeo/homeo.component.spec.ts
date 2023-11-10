import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeoComponent } from './homeo.component';

describe('HomeoComponent', () => {
  let component: HomeoComponent;
  let fixture: ComponentFixture<HomeoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeoComponent]
    });
    fixture = TestBed.createComponent(HomeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
