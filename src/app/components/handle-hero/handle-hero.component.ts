import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../models/hero';
import { HeroesService } from '../../services/heroes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-handle-hero',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  templateUrl: './handle-hero.component.html',
  styleUrl: './handle-hero.component.css'
})
export class HandleHeroComponent {
  heroForm!: FormGroup;
  id!: number;
  private snackBar = inject(MatSnackBar);
  loading: boolean = false;

  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = Number(this.activatedRoute.snapshot.params['id']);
    if (this.id) {
      this.loading = true;
      this.heroesService.getById(this.id).subscribe(hero => {
        this.heroForm = new FormGroup({
          name: new FormControl(hero?.name, [Validators.required, Validators.maxLength(20)]),
          description: new FormControl(hero?.description),
          fly: new FormControl(hero?.fly)
        });
        this.loading = false;
      });
    } else {
      this.heroForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        description: new FormControl(''),
        fly: new FormControl(false)
      });
    }
  }

  process(): void {
    if (this.heroForm.invalid) {
      this.openSnackBar('Complete los campos obligatorios', 'OK');
      return;
    }
    this.loading = true;
    let service = this.id ? this.heroesService.update(this.id, <Hero>this.heroForm.value) : this.heroesService.add(<Hero>this.heroForm.value) ;
    service.subscribe(() => {
      this.loading = false;
      this.openSnackBar('Operación registrada', 'OK');
      this.router.navigate(['/heroes']);
    })
  }

  goBack(): void {
    this.router.navigate(['/heroes']);
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 2000 });
  }

}
