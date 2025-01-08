import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceViewComponent } from './insurance-view.component';

describe('InsuranceViewComponent', () => {
  let component: InsuranceViewComponent;
  let fixture: ComponentFixture<InsuranceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
