import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsBoxComponent } from './options-box.component';

describe('OptionsBoxComponent', () => {
  let component: OptionsBoxComponent;
  let fixture: ComponentFixture<OptionsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
