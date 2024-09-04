import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantServiceService } from '../restaurant-service.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: any = {};
  food:any[]=[];

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantServiceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log("Id :"+ typeof(id));
      this.restaurantService.getRestaurantById(id).subscribe(data => {
        
        this.restaurant = data;
        this.food = data.foodItems;
        console.log(this.food);
        console.log(this.restaurant);
      });
    } else {
      console.error('Invalid restaurant ID');
    }
  }

 
}