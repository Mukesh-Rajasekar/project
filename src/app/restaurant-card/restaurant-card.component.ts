import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantServiceService } from '../restaurant-service.service';
import { User } from 'src/model/user';
import { UserService } from '../user.service';
import { LoginService } from '../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent implements OnInit {
  rData: any[] = [];
  filteredData: any[] = [];
  locations: string[] = [];
  u: string = "";

  constructor(
    private snackBar: MatSnackBar,
    private restaurantData: RestaurantServiceService,
    private router: Router,
    private user: UserService,
    private login: LoginService
  ) { }

  ngOnInit(): void {
    this.restaurantData.getRestaurant().subscribe(data => {
      this.rData = data;
      this.filteredData = data;


      this.locations = [...new Set(data.map(restaurant => restaurant.location))];
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/restaurant', id]);
  }

  filterData(searchTerm: string): void {
    this.filteredData = this.rData.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  filterByLocation(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const location = selectElement.value;

    if (location) {
      this.filteredData = this.rData.filter(restaurant =>
        restaurant.location === location
      );
    } else {
      this.filteredData = this.rData;
    }
  }

  toggleFavorite(card: any, event: Event) {
    event.stopPropagation();

    if (!card.isFavorited) {
      this.user.addFav(card.restaurantId).subscribe(
        response => {
          console.log("Successfully added to favorites:", response);
          this.snackBar.open("Successfully Added", "Done", {
            duration: 3000
          });
          card.isFavorited = true;
        },
        error => {
          if (error.status === 409) {
            console.error("Restaurant is already in favorites");

            this.snackBar.open("This restaurant is already in your favorites.", "Try Others", {
              duration: 3000
            });
          } else {
            console.error("Error adding to favorites:", error);
          }
        }
      );
    }
  }

}