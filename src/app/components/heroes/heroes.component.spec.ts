import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { Hero } from '../../models/hero';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { HeroesService } from '../../services/heroes.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroesServiceMock: jasmine.SpyObj<HeroesService>;

  const heroesMock: Hero[] = [
    { id: 1, name: 'Superman', description: 'A man of steel', fly: true, created: new Date() },
    { id: 2, name: 'Batman', description: 'A dark knight', fly: false, created: new Date() },
  ];

  beforeEach(async () => {
    heroesServiceMock = jasmine.createSpyObj('HeroesService', ['getAll', 'delete']);
    
    await TestBed.configureTestingModule({
      imports: [HeroesComponent, NoopAnimationsModule],
      providers: [
        { provide: HeroesService, useValue: heroesServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;

    heroesServiceMock.getAll.and.returnValue(of(heroesMock));

    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data on ngOnInit', () => {
    expect(component.dataSource).toEqual(jasmine.any(MatTableDataSource));
    expect(component.dataSource.data).toEqual(heroesMock);
    expect(component.loading).toBeFalse();
  });

  it('should clean hero detail', () => {
    component.heroDetail = { id: 1, name: 'Superman', description: 'A man of steel', fly: true, created: new Date() };
    component.cleanDetail();
    expect(component.heroDetail).toBeNull();
  });
});
