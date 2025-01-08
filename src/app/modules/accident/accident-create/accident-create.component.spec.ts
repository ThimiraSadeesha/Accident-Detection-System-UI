import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentCreateComponent } from './accident-create.component';

describe('AccidentCreateComponent', () => {
  let component: AccidentCreateComponent;
  let fixture: ComponentFixture<AccidentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
