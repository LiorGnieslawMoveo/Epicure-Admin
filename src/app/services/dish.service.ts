import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDish } from '../interfaces/data.interface';

@Injectable({
    providedIn: 'root'
})
export class DishService {
    private apiUrl = 'http://localhost:4000/api/dishes';

    constructor(private http: HttpClient) { }

    getDishes(): Observable<IDish[]> {
        return this.http.get<IDish[]>(this.apiUrl);
    }
}

