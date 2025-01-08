import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCreateComponent } from './insurance-create.component';

describe('InsuranceCreateComponent', () => {
  let component: InsuranceCreateComponent;
  let fixture: ComponentFixture<InsuranceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
