import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { LoginService } from '../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {
  favRest: any[] = []; // Initialize with an empty array
  hasFavorites: boolean = false; // A boolean flag to check if there are favorites

  constructor(private user: UserService, private logins: LoginService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  // Function to load favorite restaurants
  loadFavorites(): void {
    let id = this.logins.getUserId();
    this.user.getFavRestaurants().subscribe({
      next: (data) => {
        this.favRest = data;
        this.hasFavorites = this.favRest.length > 0; // Update hasFavorites flag based on data
        console.log('Favorite restaurants:', this.favRest);
      },
      error: () => { 
        console.log("Error occurred while fetching favorite restaurants"); 
        this.hasFavorites = false; // Set to false if error occurred
      }
    });
  }

  // Function to delete favorite restaurant
  deleteFav(restaurantId: any): void {
    console.log("Deleting restaurant with ID: " + restaurantId);
    this.user.deleteFavRest(restaurantId).subscribe({
      next: () => {
        console.log("Deleted favorite restaurant");
        this.snackBar.open('Favorite restaurant deleted successfully!', ' ', {
          duration: 5000,
          verticalPosition: 'bottom',
        });
        this.loadFavorites(); // Refresh the favorite list after deletion
      },
      error: () => {
        this.snackBar.open('Error occurred while deleting favorite restaurant.', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
      }
    });
  }
}
