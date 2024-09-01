export class FoodItem {
    dishName?: string;
    price?: number;
    rating?: number;
    dishDescription?: string;
  
    constructor(
      dishName?: string,
      price?: number,
      rating?: number,
      dishDescription?: string
    ) {
      this.dishName = dishName;
      this.price = price;
      this.rating = rating;
      this.dishDescription = dishDescription;
    }
  }
  
  // Defines a Cuisine class with optional properties
  export class Cuisine {
    cuisineId?: number;
    name?: string;
    type?: string;
    description?: string;
  
    constructor(
      cuisineId?: number,
      name?: string,
      type?: string,
      description?: string
    ) {
      this.cuisineId = cuisineId;
      this.name = name;
      this.type = type;
      this.description = description;
    }
  }
  
  // Defines a Restaurant class with optional properties
  export class Restaurant {
    restaurantId?: string;
    name?: string;
    location?: string;
    imagePath?:string;
    cuisine?: Cuisine[]; // Optional array of Cuisine objects
    foodItems?: FoodItem[]; // Optional array of FoodItem objects
  
    constructor(
      restaurantId?: string,
      name?: string,
      location?: string,
      cuisine?: Cuisine[],
      foodItems?: FoodItem[]
    ) {
      this.restaurantId = restaurantId;
      this.name = name;
      this.location = location;
      this.cuisine = cuisine;
      this.foodItems = foodItems;
    }
  }
  
  // Defines a User class with mandatory email and userId, and optional properties for the rest
  export class User {
    userId?: string;
    password?: string;
    username?: string;
    email?: string;
    profileImage?: string;
    favoriteRestaurants?: Restaurant[]; // Optional array of Restaurant objects
    favoriteCuisines?: Cuisine[]; // Optional array of Cuisine objects
  
    constructor(
      userId: string,
      email: string,
      password?: string,
      username?: string,
      profileImage?: string,
      favoriteRestaurants?: Restaurant[],
      favoriteCuisines?: Cuisine[]
    ) {
      this.userId = userId;
      this.email = email;
      this.password = password;
      this.username = username;
      this.profileImage = profileImage;
      this.favoriteRestaurants = favoriteRestaurants;
      this.favoriteCuisines = favoriteCuisines;
    }
  }