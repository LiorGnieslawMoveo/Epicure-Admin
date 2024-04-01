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
}

