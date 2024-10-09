import { Component, inject, ViewChild } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Hero } from '../../models/hero';
import { ConfirmComponent } from '../confirm/confirm.component';
import { SearchComponent } from "../search/search.component";
import { CardHeroComponent } from "../card-hero/card-hero.component";
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    SearchComponent,
    CardHeroComponent
],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {

  displayedColumns: string[] = ['id', 'name', 'fly', 'edit', 'detail', 'delete'];
  dataSource: any;
  readonly dialog = inject(MatDialog);
  heroDetail!: Hero | null;
  loading: boolean = false;

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }

  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private paginatorIntl: MatPaginatorIntl
  ) {}

  ngOnInit() {
    this.loading = true;
    this.initData();   
  }

  navigateSaveHero() {
    this.router.navigate(['/register']);
  }

  navigateEditHero(id: number) {
    this.router.navigate([`/edit/${id}`]);
  }

  openDialog(element: Hero) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { hero: element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.heroDetail = null;
        this.dataSource = null;
        this.heroesService.delete(element.id).subscribe(() => {
          this.initData();
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cleanDetail() {
    this.heroDetail = null;
  }

  private initData() {
    this.heroesService.getAll().subscribe(heroes => {
      this.dataSource = new MatTableDataSource(heroes);
      this.paginatorIntl.itemsPerPageLabel = 'Resultados por pagina';
      this.paginatorIntl.firstPageLabel = "Primera pagina";
      this.paginatorIntl.nextPageLabel = "Siguiente";
      this.paginatorIntl.previousPageLabel = "Anterior";
      this.paginatorIntl.lastPageLabel = "Ultima pagina";
      this.loading = false;
    })
  }

}
