import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Hospital, Search } from './app.entities';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) { }

    public findHospitalByCity(city: string): Observable<Hospital[]> {
        return this.http.get<Hospital[]>(`${environment.url}/hospitals.php?city=${city}`);
    }

    public async findPricesBySearchTerms(data: Search): Promise<any> {
        return this.http.post<any>(`${environment.url}/search.php`, data).toPromise();
    }
}
