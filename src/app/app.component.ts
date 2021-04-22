import { Component } from '@angular/core';

import { Hospital, Search } from './app.entities';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  hospital: Hospital;
  search: Search;
  searching = false;
  results: any;

  constructor(private service: AppService) { }

  public hospitalEvent(hospital: Hospital): void {
    this.hospital = hospital;
  }

  public async searchEvent(search: Search): Promise<void> {
    this.results = null;
    this.searching = true;
    this.results = await this.service.findPricesBySearchTerms(search);
    this.searching = false;
  }

  public reset(event: boolean): void {
    this.hospital = null;
    this.search = null;
    this.results = null;
  }
}
