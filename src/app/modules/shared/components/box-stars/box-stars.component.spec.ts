import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxStarsComponent } from './box-stars.component';

describe('BoxStarsComponent', () => {
  let component: BoxStarsComponent;
  let fixture: ComponentFixture<BoxStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxStarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
