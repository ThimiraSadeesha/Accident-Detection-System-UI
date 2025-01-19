import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentBarChartComponent } from './accident-bar-chart.component';

describe('AccidentBarChartComponent', () => {
  let component: AccidentBarChartComponent;
  let fixture: ComponentFixture<AccidentBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentBarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
