import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Hospital, Search } from '../app.entities';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input() hospital: Hospital;
  @Output() query = new EventEmitter<Search>();
  @Output() resetEmitter = new EventEmitter<boolean>();
  searchString: string;

  constructor() { }

  public search(): void {
    // TODO: something informative for the user here
    if (!this.searchString || !this.hospital) {
      return;
    }
    const s = this.searchString.split(',');
    this.query.emit({ hospital: this.hospital.npi_number, search: s });
    this.searchString = '';
  }

  public reset(): void {
    this.resetEmitter.emit(true);
  }
}
