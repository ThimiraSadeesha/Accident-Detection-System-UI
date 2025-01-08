import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentReviewComponent } from './accident-review.component';

describe('AccidentReviewComponent', () => {
  let component: AccidentReviewComponent;
  let fixture: ComponentFixture<AccidentReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
