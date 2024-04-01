import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChef } from '../interfaces/data.interface';
import { enviroment } from '../../enviroment/enviroment';
@Injectable({
    providedIn: 'root'
})
export class ChefService {
    private apiUrl = enviroment.BASE_URL + '/chefs';

    constructor(private http: HttpClient) { }

    getChefs(): Observable<IChef[]> {
        return this.http.get<IChef[]>(this.apiUrl);
    }
}

