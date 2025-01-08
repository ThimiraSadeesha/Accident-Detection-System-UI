import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleModalsComponent } from './handle-modals.component';

describe('HandleModalsComponent', () => {
  let component: HandleModalsComponent;
  let fixture: ComponentFixture<HandleModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandleModalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
