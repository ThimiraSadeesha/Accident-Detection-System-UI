import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireCreateComponent } from './fire-create.component';

describe('FireCreateComponent', () => {
  let component: FireCreateComponent;
  let fixture: ComponentFixture<FireCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FireCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FireCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
