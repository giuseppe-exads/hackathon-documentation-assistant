import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationMessageComponent } from './documentation-message.component';

describe('DocumentationMessageComponent', () => {
  let component: DocumentationMessageComponent;
  let fixture: ComponentFixture<DocumentationMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentationMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
