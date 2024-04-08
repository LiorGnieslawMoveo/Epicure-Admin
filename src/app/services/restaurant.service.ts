import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRestaurant } from '../interfaces/data.interface';
import { enviroment } from '../../enviroment/enviroment';

@Injectable({
    providedIn: 'root'
})
export class RestaurantsService {
    private apiUrl = enviroment.BASE_URL + '/restaurants';

    constructor(private http: HttpClient) { }

    getRestaurants(): Observable<IRestaurant[]> {
        return this.http.get<IRestaurant[]>(this.apiUrl);
    }

    updateRestaurant(restaurantData: IRestaurant): Observable<IRestaurant> {
        const url = `${this.apiUrl}/${restaurantData._id}`;
        return this.http.put<IRestaurant>(url, restaurantData);
    }

    addNewRestaurant(restaurantData: IRestaurant): Observable<IRestaurant> {
        return this.http.post<IRestaurant>(this.apiUrl, restaurantData);
    }
}

