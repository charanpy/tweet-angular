import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashtagTweetsComponent } from './hashtag-tweets.component';

describe('HashtagTweetsComponent', () => {
  let component: HashtagTweetsComponent;
  let fixture: ComponentFixture<HashtagTweetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HashtagTweetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HashtagTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
