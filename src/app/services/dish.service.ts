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

    constructor(private http: HttpClient) { }

    getDishes(): Observable<IDish[]> {
        return this.http.get<IDish[]>(this.apiUrl);
    }
}

