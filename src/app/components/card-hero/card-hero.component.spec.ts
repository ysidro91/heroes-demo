import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHeroComponent } from './card-hero.component';
import { Hero } from '../../models/hero';
import { By } from '@angular/platform-browser';

describe('CardHeroComponent', () => {
  let component: CardHeroComponent;
  let fixture: ComponentFixture<CardHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit eventClose when closeCard is called', () => {
    spyOn(component.eventClose, 'emit');
    component.closeCard();
    expect(component.eventClose.emit).toHaveBeenCalled();
  });

  it('should display hero name and description', () => {
    const hero: Hero = {
      id: 1,
      name: 'Spiderman',
      description: 'A hero with spider powers',
      created: new Date(),
      fly: false,
      updated: new Date()
    };
    component.hero = hero;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
    const subtitleElement = fixture.debugElement.query(By.css('mat-card-subtitle')).nativeElement;
    const contentElement = fixture.debugElement.query(By.css('mat-card-content p:last-child')).nativeElement;
    

    expect(titleElement.textContent).toContain('Nombre: Spiderman');
    expect(subtitleElement.textContent).toContain('Descripción: A hero with spider powers');
    expect(contentElement.textContent).toContain('Fecha actualizacion:');
  });
});
