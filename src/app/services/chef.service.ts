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
    private apiAdminUrl = enviroment.BASE_URL + '/chefs/admin';


    constructor(private http: HttpClient) { }

    getChefs(): Observable<IChef[]> {
        return this.http.get<IChef[]>(this.apiUrl);
    }

    getChefsAdmin(): Observable<IChef[]> {
        return this.http.get<IChef[]>(this.apiAdminUrl);
    }

    updateChef(chefData: IChef): Observable<IChef> {
        const url = `${this.apiUrl}/${chefData._id}`;
        return this.http.put<IChef>(url, chefData);
    }

    addNewChef(chefData: IChef): Observable<IChef> {
        return this.http.post<IChef>(this.apiUrl, chefData);
    }
}

