import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleHeroComponent } from './handle-hero.component';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Hero } from '../../models/hero';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HandleHeroComponent', () => {
  let component: HandleHeroComponent;
  let fixture: ComponentFixture<HandleHeroComponent>;
  let heroesServiceMock: jasmine.SpyObj<HeroesService>;
  let routerMock: jasmine.SpyObj<Router>;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;
  let activatedRouteMock: any;

  beforeEach(async () => {
    heroesServiceMock = jasmine.createSpyObj('HeroesService', ['getById', 'add', 'update']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
    activatedRouteMock = {
      snapshot: {
        params: { id: 5 }
      }
    };

    heroesServiceMock.getById.and.returnValue(of({
      id: 1,
      name: 'Iron Man',
      description: 'A hero with a steel suit',
      created: new Date(),
      fly: true
    }));

    await TestBed.configureTestingModule({
      imports: [HandleHeroComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: HeroesService, useValue: heroesServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form for editing an existing hero', () => {
    const hero: Hero = {
      id: 5,
      name: 'Iron Man',
      description: 'A hero with a steel suit',
      created: new Date(),
      fly: true
    };

    heroesServiceMock.getById.and.returnValue(of(hero));
    fixture.detectChanges();

    expect(component.heroForm.value).toEqual({
      name: 'Iron Man',
      description: 'A hero with a steel suit',
      fly: true
    });
  });

  it('should navigate back to heroes list', () => {
    component.goBack();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/heroes']);
  });
});
