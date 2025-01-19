import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentServirtyChartComponent } from './accident-servirty-chart.component';

describe('AccidentServirtyChartComponent', () => {
  let component: AccidentServirtyChartComponent;
  let fixture: ComponentFixture<AccidentServirtyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentServirtyChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentServirtyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
