import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentPopGrdComponent } from './accident-pop-grd.component';

describe('AccidentPopGrdComponent', () => {
  let component: AccidentPopGrdComponent;
  let fixture: ComponentFixture<AccidentPopGrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentPopGrdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentPopGrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
