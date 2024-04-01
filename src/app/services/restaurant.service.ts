import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRestaurant } from '../interfaces/data.interface';

@Injectable({
    providedIn: 'root'
})
export class RestaurantsService {
    private apiUrl = 'http://localhost:4000/api/restaurants';

    constructor(private http: HttpClient) { }

    getRestaurants(): Observable<IRestaurant[]> {
        return this.http.get<IRestaurant[]>(this.apiUrl);
    }
}

