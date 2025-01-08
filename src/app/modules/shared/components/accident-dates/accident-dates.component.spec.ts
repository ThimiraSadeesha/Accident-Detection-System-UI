import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentDatesComponent } from './accident-dates.component';

describe('AccidentDatesComponent', () => {
  let component: AccidentDatesComponent;
  let fixture: ComponentFixture<AccidentDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentDatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
