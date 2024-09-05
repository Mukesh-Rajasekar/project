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

  searchTerm: string = '';
  selectedCity: string = '';

  constructor(
    private snackBar: MatSnackBar,
    private restaurantData: RestaurantServiceService,
    private router: Router,
    private user: UserService,
    private login: LoginService
  ) { }

  isLoggedIn(): boolean {
    return this.login.isLoggedIn();
  }

  ngOnInit(): void {
    this.restaurantData.getRestaurant().subscribe(data => {
      this.rData = data;
      this.filteredData = data;


      this.locations = [
        ...new Set(
          data.map(restaurant => {
            const parts = restaurant.location.split(',');
            // Get the last part and trim whitespace to get the city name
            return parts[parts.length - 1].trim();
          })
        )
      ];
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/restaurant', id]);
  }

  // filterData(searchTerm: string): void {
  //   this.filteredData = this.rData.filter(restaurant =>
  //     restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // }

  // filterByLocation(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement;
  //   const location = selectElement.value;

  //   if (location) {
  //     this.filteredData = this.rData.filter(restaurant =>
  //       restaurant.location === location
  //     );
  //   } else {
  //     this.filteredData = this.rData;
  //   }
  // }
  onSearchChanged(searchTerm: string): void {
    this.searchTerm = searchTerm.toLowerCase(); // store search term in lowercase
    this.applyFilters(); // apply filters after search input is changed
  }
  
  onLocationChanged(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCity = selectElement.value.toLowerCase().trim(); // store selected city
    this.applyFilters(); // apply filters after city is changed
  }
  applyFilters(): void {
    this.filteredData = this.rData.filter(restaurant => {
      const restaurantLocation = restaurant.location.toLowerCase().trim();
      const restaurantCity = restaurantLocation.split(',').pop().trim();
  
      // Check if the restaurant is in the selected city
      const locationMatch = this.selectedCity === '' || restaurantCity === this.selectedCity;
  
      // Check if the restaurant matches the search term
      const searchTermMatch = restaurant.name.toLowerCase().includes(this.searchTerm) || 
                              restaurantLocation.includes(this.searchTerm);
  
      return locationMatch && searchTermMatch;
    });
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

            this.snackBar.open("This restaurant is already in your favorite list","", {
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