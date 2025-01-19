import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDownoadComponent } from './report-downoad.component';

describe('ReportDownoadComponent', () => {
  let component: ReportDownoadComponent;
  let fixture: ComponentFixture<ReportDownoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportDownoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDownoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
