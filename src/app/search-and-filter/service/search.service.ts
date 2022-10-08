import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  getUsers() {
    return of([
      {name: '123', status: 1},
      {name: 'qwegg', status: 2},
      {name: 'fgh', status: 1},
      {name: 'ggfss', status: 3},
      {name: 'ff', status: 3},
    ])
  }
}
