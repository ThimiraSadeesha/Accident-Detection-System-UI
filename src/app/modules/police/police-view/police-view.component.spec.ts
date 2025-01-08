import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceViewComponent } from './police-view.component';

describe('PoliceViewComponent', () => {
  let component: PoliceViewComponent;
  let fixture: ComponentFixture<PoliceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliceViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
