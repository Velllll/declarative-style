import { Injectable } from '@angular/core';
import { of, delay, map, throwError, tap } from 'rxjs';

@Injectable()
export class GetDataService {

  constructor() { }

  getUsers() {
    return of([{name: 'dsdad'}, {name: '1328'}])
    .pipe(
      delay(2000),
      // tap(() => {
      //   throw new Error('502 error')
      // })
    )
  }

  getPhotosUrl() {
    return of([{url: 'google'}, {url: 'yahoo'}]).pipe(delay(1000))
  }
}
