import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../models/hero';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-hero',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './card-hero.component.html',
  styleUrl: './card-hero.component.css'
})
export class CardHeroComponent {
  @Input() hero!: Hero | null;
  @Output() eventClose = new EventEmitter<any>();

  closeCard() {
    this.eventClose.emit();
  }

}
