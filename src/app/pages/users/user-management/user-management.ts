import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManagerProvider } from '../../../../providers/manager.provider';
import { User } from '../../../../models/user.model';
import { CommonModule } from '@angular/common';
import { confirmDialog } from '../../../utils/swal/swal';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.scss'],
  imports: [CommonModule],
})
export class UserManagement implements OnInit {
  members: User[] = [];
  isLoading = false;

  constructor(
    private snackBar: MatSnackBar,
    private managerProvider: ManagerProvider
  ) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.isLoading = true;
    this.managerProvider.getMembers().subscribe({
      next: (res) => {
        this.members = res;
      },
      error: (err) => {
        console.error('Error loading members:', err);
        this.snackBar.open('Failed to load members', 'Close', {
          duration: 3000,
        });
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  async deleteUser(houseId: number, userId: number): Promise<void> {
    const confirmed = await confirmDialog(
      'Remove Member?',
      'Are you sure you want to remove this member from the house? This action cannot be undone.',
      'Remove',
      'Cancel'
    );

    if (confirmed) {
      this.isLoading = true;

      this.managerProvider.deleteMember(houseId, userId).subscribe({
        next: () => {
          this.snackBar.open('Member removed successfully', 'Close', {
            duration: 2000,
          });

          this.members = this.members
            .map((member) => {
              if (member.id === userId) {
                const updatedHouses =
                  member.houses?.filter((h) => h.id !== houseId) ?? [];
                return { ...member, houses: updatedHouses };
              }
              return member;
            })
            .filter((member) => member.houses && member.houses.length > 0);
        },
        error: (err) => {
          console.error('Failed to remove member:', err);
          this.snackBar.open('Failed to remove member', 'Close', {
            duration: 3000,
          });
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
