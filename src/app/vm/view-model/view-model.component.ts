import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { catchError, combineLatest, EMPTY, map, Observable, of, startWith } from 'rxjs';
import { GetDataService } from '../service/get-data.service';

@Component({
  selector: 'app-view-model',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.scss'],
  providers: [GetDataService]
})
export class ViewModelComponent implements OnInit {

  users$ = this.getData.getUsers().pipe(
    startWith(null),
    catchError(() => EMPTY)
  )

  imgs$ = this.getData.getPhotosUrl().pipe(startWith(null))

  vm$ = combineLatest([this.users$, this.imgs$]).pipe(
    map(([users, imgs]) => ({users, imgs})),
  )

  constructor(
    private getData: GetDataService
  ) { }

  ngOnInit(): void { 

  }

}
