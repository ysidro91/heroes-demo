import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';
import { Hero } from '../models/hero';

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesService);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array of heroes when getAll is called', (done) => {
    service.getAll().subscribe((heroes) => {
      expect(heroes).toEqual([]);
      done();
    });
  });

  it('should add a hero and return it', (done) => {
    const hero: Hero = { id: 0, name: 'Superman', description: 'Man of Steel', created: new Date(), fly: true };

    service.add(hero).subscribe(() => {
      service.getAll().subscribe((heroes) => {
        expect(heroes.length).toBe(1);
        expect(heroes[0]).toEqual(jasmine.objectContaining({ name: 'Superman' }));
        done();
      });
    });
  });

  it('should return a hero by ID', (done) => {
    const hero: Hero = { id: 0, name: 'Batman', description: 'Dark Knight', created: new Date(), fly: false };

    service.add(hero).subscribe(() => {
      service.getById(hero.id).subscribe((foundHero) => {
        expect(foundHero).toEqual(jasmine.objectContaining({ name: 'Batman' }));
        done();
      });
    });
  });

  it('should update an existing hero', (done) => {
    const hero: Hero = { id: 0, name: 'Flash', description: 'Speedster', created: new Date(), fly: false };
    
    service.add(hero).subscribe(() => {
      const updatedHero: Hero = { id: hero.id, name: 'Flash', description: 'Fastest Man Alive', created: hero.created, fly: false };

      service.update(hero.id, updatedHero).subscribe(() => {
        service.getById(hero.id).subscribe((foundHero) => {
          expect(foundHero).toEqual(jasmine.objectContaining({ description: 'Fastest Man Alive' }));
          done();
        });
      });
    });
  });

  it('should delete a hero', (done) => {
    const hero: Hero = { id: 0, name: 'Aquaman', description: 'King of Atlantis', created: new Date(), fly: false };

    service.add(hero).subscribe(() => {
      service.delete(hero.id).subscribe(() => {
        service.getAll().subscribe((heroes) => {
          expect(heroes.length).toBe(0);
          done();
        });
      });
    });
  });
});
