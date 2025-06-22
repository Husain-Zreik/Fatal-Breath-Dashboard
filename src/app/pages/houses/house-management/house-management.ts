import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ManagerProvider } from '../../../../providers/manager.provider';
import { House } from '../../../../models/house.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-house-management',
  templateUrl: './house-management.html',
  styleUrls: ['./house-management.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
})
export class HouseManagement implements OnInit, AfterViewInit {
  houses: House[] = [];
  isLoading = false;

  dataSource = new MatTableDataSource<House>();
  displayedColumns: string[] = ['name', 'city', 'country', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private managerProvider: ManagerProvider,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHouses();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadHouses(): void {
    this.isLoading = true;
    this.managerProvider.loadHouses().subscribe({
      next: (res) => {
        this.houses = res.houses || [];
      },
      error: (err) => {
        console.error('Failed to load houses:', err);
        this.snackBar.open('Failed to load houses', 'Close', {
          duration: 3000,
        });
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  navigateToRooms(houseId: number): void {
    this.router.navigate(['/houses', houseId, 'rooms']);
  }

  confirmDeleteHouse(houseId: number): void {
    if (confirm('Are you sure you want to delete this house?')) {
      this.managerProvider.deleteHouse(houseId).subscribe({
        next: () => {
          this.houses = this.houses.filter((h) => h.id !== houseId);
          this.dataSource.data = this.houses;
          this.snackBar.open('House deleted', 'Close', { duration: 2000 });
        },
        error: (err) => {
          console.error('Failed to delete house:', err);
          this.snackBar.open('Failed to delete house', 'Close', {
            duration: 3000,
          });
        },
      });
    }
  }
}
