import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBackgroundImageComponent } from './show-background-image.component';

describe('ShowBackgroundImageComponent', () => {
  let component: ShowBackgroundImageComponent;
  let fixture: ComponentFixture<ShowBackgroundImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBackgroundImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowBackgroundImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
