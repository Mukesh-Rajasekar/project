import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { LoginService } from '../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent {
  favRest: any[] = [];
  constructor(private user: UserService, private logins: LoginService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log('working');
    let id = this.logins.getUserId();
    this.user.getFavRestaurants().subscribe({
      next: (data) => {
        this.favRest = data;
        console.log(this.favRest);
      },
      error: () => { console.log("error occured"); }
    })
  }



  deleteFav(restaurantId: any) {
    console.log("Working: " + restaurantId);
    this.user.deleteFavRest(restaurantId).subscribe({
      next: (data) => {
        console.log("Deleted favorite restaurant");
        this.refreshFavorites();
        this.snackBar.open('Favorite restaurant deleted successfully!', ' ', {
          duration: 5000,
          verticalPosition: 'bottom',
        });
      },
      // error: () => {
      //   this.snackBar.open('Error occurred while deleting favorite restaurant.', 'Close', {
      //     duration: 3000,
      //     verticalPosition: 'bottom',
      //     horizontalPosition: 'right',
      //   });
      // }
    });
  }
  
  refreshFavorites() {
    let id = this.logins.getUserId();
    this.user.getFavRestaurants().subscribe({
      next: (data) => {
        this.favRest = data;
        console.log(this.favRest);
      },
      error: () => {
        console.log("Error occurred while fetching favorite restaurants");
      }
    });
  }

}
