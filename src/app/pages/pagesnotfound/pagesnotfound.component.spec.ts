import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesnotfoundComponent } from './pagesnotfound.component';

describe('PagesnotfoundComponent', () => {
  let component: PagesnotfoundComponent;
  let fixture: ComponentFixture<PagesnotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesnotfoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesnotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
