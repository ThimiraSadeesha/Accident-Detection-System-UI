import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireViewComponent } from './fire-view.component';

describe('FireViewComponent', () => {
  let component: FireViewComponent;
  let fixture: ComponentFixture<FireViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FireViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FireViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
