import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDish } from '../interfaces/data.interface';
import { enviroment } from '../../enviroment/enviroment';

@Injectable({
    providedIn: 'root'
})
export class DishService {
    private apiUrl = enviroment.BASE_URL + '/dishes';
    private apiAdminUrl = enviroment.BASE_URL + '/dishes/admin';

    constructor(private http: HttpClient) { }

    getDishes(): Observable<IDish[]> {
        return this.http.get<IDish[]>(this.apiUrl);
    }

    getDishesAdmin(): Observable<IDish[]> {
        return this.http.get<IDish[]>(this.apiAdminUrl);
    }

    updateDish(dishData: IDish): Observable<IDish> {
        const url = `${this.apiUrl}/${dishData._id}`;
        return this.http.put<IDish>(url, dishData);
    }

    addNewDish(dishData: IDish): Observable<IDish> {
        return this.http.post<IDish>(this.apiUrl, dishData);
    }

}

