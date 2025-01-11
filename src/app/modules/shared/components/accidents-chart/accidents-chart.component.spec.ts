import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentsChartComponent } from './accidents-chart.component';

describe('AccidentsChartComponent', () => {
  let component: AccidentsChartComponent;
  let fixture: ComponentFixture<AccidentsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
