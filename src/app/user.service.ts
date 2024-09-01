import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Restaurant, User } from 'src/model/user';
import { RestaurantServiceService } from './restaurant-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  arrayOfFavRest:Restaurant[] = [];
  constructor(private http:HttpClient, private res:RestaurantServiceService) { }


url:string= 'http://localhost:8765/api/v2/';  
// CRud


  registerUser(user?:User):Observable<User>
  {
    return this.http.post<User>(this.url+"register",user);
  }

  getFavRestaurants():Observable<any>
  {
    return this.http.get<any>(this.url+"user/display-all-fav-restaurant");
  }

  // /user/{userId}/favorite-restaurant

  addFav(restaurantId: string): Observable<any> {
    console.log("Inside User Service addFav");
    return this.res.getRestaurantById(restaurantId).pipe(
      switchMap(restaurant => {
        console.log("Restaurant data : ", restaurant);
        return this.http.post<any>(`${this.url}user/favorite-restaurant`, restaurant);
      })
    );
  }

  // addFav(restaurantId:string){
  //   console.log("Inside User Service addFav");
  //   let restaurant: Restaurant = {};
  //    this.res.getRestaurantById(restaurantId).subscribe(data => {
  //     restaurant = data;
  //     console.log("Inside User Service Restaurant :"+JSON.stringify(restaurant));
  //     this.http.post<any>(this.url+"user/favorite-restaurant",restaurant);
      
  //   });
    
     
  // }

  // addFav(restaurantId: string, userId: string): Observable<any> {
  //   console.log("Inside User Service");
    
  //   // Get the restaurant details by ID
  //   return this.res.getRestaurantById(restaurantId).pipe(
  //     switchMap((restaurant: any) => {
  //       console.log("Restaurant data:", restaurant);
  //       console.log("User service add fav rest userId :", userId);
        
  //       // Send POST request with userId in URL and restaurant in body
  //       return this.http.post<any>(`${this.url}/user/${userId}/favorite-restaurant`, restaurant);
  //     })
  //   );
  // }

  
}
