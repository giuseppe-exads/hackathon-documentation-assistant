import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryShortcutsComponent } from './category-shortcuts.component';

describe('CategoryShortcutsComponent', () => {
  let component: CategoryShortcutsComponent;
  let fixture: ComponentFixture<CategoryShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryShortcutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
