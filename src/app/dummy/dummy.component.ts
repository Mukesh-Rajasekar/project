import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent {
  favRest: any[] = [];
  constructor(private user: UserService, private logins: LoginService) { }

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
    this.user.deleteFavRest(restaurantId).subscribe(data => {
      console.log("Delete fav restaurant component");
      this.refreshFavorites();
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
