import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChef } from '../interfaces/data.interface';

@Injectable({
    providedIn: 'root'
})
export class ChefService {
    private apiUrl = 'http://localhost:4000/api/chefs';

    constructor(private http: HttpClient) { }

    getChefs(): Observable<IChef[]> {
        return this.http.get<IChef[]>(this.apiUrl);
    }
}

