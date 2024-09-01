import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantServiceService {
  private apiUrl:string="http://localhost:8083/api/v3/get-all-restaurants";  

  constructor(private http: HttpClient) { }

 
  getRestaurant(): Observable<any[]> {
    console.log("Fetching all restaurants");
    return this.http.get<any[]>(this.apiUrl);
  }

 
  getRestaurantById(id: string): Observable<any> {
    console.log("Inside Service "+id);
    
    // const url:string = "http://localhost:8083/api/v3/get-restaurant-by-id/{restaurantId}"
    // console.log(`Fetching restaurant with ID: ${id}`);
    
    
    return this.http.get<any>("http://localhost:8083/api/v3/get-restaurant-by-id/"+id);
  }
}
