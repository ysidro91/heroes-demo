import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private heroes: Hero[] = [];
  private delay = 2000;

  constructor() { }

  getAll(): Observable<Hero[]> {
    return of(this.heroes).pipe(delay(this.delay));
  }

  getById(id: number): Observable<Hero | undefined> {
    let hero = this.heroes.find((hero: Hero) => hero.id === id);
    return of(hero).pipe(delay(this.delay));
  }

  add(hero: Hero): Observable<void> {
    hero.id = this.generateId();
    hero.created = new Date();
    this.heroes.push(hero);
    return of(undefined).pipe(delay(this.delay));
  }

  update(id: number, newHero: Hero): Observable<void> {
    let currentHero = this.heroes.find((hero: Hero) => hero.id === id);
    if (currentHero) {
      currentHero.name = newHero.name;
      currentHero.description = newHero.description;
      currentHero.fly = newHero.fly;
      currentHero.updated = new Date();
    }
    return of(undefined).pipe(delay(this.delay));
  }

  delete(id: number): Observable<void> {
    let heroIndex = this.heroes.findIndex((hero: Hero) => hero.id === id);
    this.heroes.splice(heroIndex, 1);
    return of(undefined).pipe(delay(this.delay));
  }

  private generateId(): number {
    return Math.floor(Math.random() * 9999999999);
  }
}
