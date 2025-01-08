import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceCreateComponent } from './police-create.component';

describe('PoliceCreateComponent', () => {
  let component: PoliceCreateComponent;
  let fixture: ComponentFixture<PoliceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliceCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
