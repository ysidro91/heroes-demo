import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleHeroComponent } from './handle-hero.component';

describe('HandleHeroComponent', () => {
  let component: HandleHeroComponent;
  let fixture: ComponentFixture<HandleHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandleHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
