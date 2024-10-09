import { Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HandleHeroComponent } from './components/handle-hero/handle-hero.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
    { path: 'heroes', component: HeroesComponent },
    { path: 'register', component: HandleHeroComponent },
    { path: 'edit/:id', component: HandleHeroComponent },
    { path: '**', component: PageNotFoundComponent }
];
