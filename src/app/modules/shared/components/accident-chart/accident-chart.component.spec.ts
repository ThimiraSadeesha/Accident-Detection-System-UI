import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentChartComponent } from './accident-chart.component';

describe('AccidentChartComponent', () => {
  let component: AccidentChartComponent;
  let fixture: ComponentFixture<AccidentChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
