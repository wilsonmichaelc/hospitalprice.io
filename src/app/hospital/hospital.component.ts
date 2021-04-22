import { Component, EventEmitter, Output } from '@angular/core';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import { Hospital } from '../app.entities';
import { AppService } from '../app.service';

@Component({
    selector: 'app-hospital',
    templateUrl: './hospital.component.html',
    styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent {

    @Output() hospital = new EventEmitter<Hospital>();

    hospitals: any[] = [];
    model: any;
    searching = false;
    searchFailed = false;

    constructor(private service: AppService) { }

    formatter = (x: { name: string }) => x.name;

    search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => this.searching = true),
            switchMap(term =>
                this.hospitalService(term).pipe(
                    tap(() => this.searchFailed = false),
                    catchError(() => {
                        this.searchFailed = true;
                        return of([]);
                    }))
            ),
            tap(() => this.searching = false)
        )

    public hospitalService(term: string): Observable<Hospital[]> {
        if (term === '') {
            return of([]);
        }

        return this.service.findHospitalByCity(term).pipe(
            map(response => response)
        );
    }

    public hospitalSelected(hospital: Hospital): void {
        this.hospital.emit(hospital);
    }

}
