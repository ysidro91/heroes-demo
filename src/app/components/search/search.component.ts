import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() eventKeyUp = new EventEmitter<string>();

  keyup(event: Event){
    let filterValue = (event.target as HTMLInputElement).value;
    this.eventKeyUp.emit(filterValue);
  }

}
