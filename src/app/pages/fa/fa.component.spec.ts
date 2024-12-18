import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAComponent } from './fa.component';

describe('FAComponent', () => {
  let component: FAComponent;
  let fixture: ComponentFixture<FAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
