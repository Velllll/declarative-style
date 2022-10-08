import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, filter, map, Observable, startWith, take } from 'rxjs';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  users$ = new BehaviorSubject<{name: string, status: number}[] | null>(null)
  filtredUsers$!: Observable<{name: string, status: number}[] | null>

  filterGroup = new FormGroup({
    search: new FormControl(''),
    addUser: new FormControl('', Validators.required),
    status: new FormControl('all')
  })

  constructor(
    private userService: SearchService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().pipe(take(1)).subscribe(users => this.users$.next(users))

    const inputValues$ = this.filterGroup.valueChanges.pipe(startWith({search: '', status: 'all'}))

    this.filtredUsers$ = combineLatest([inputValues$, this.users$]).pipe(
      map(([inputValues, users]) => {
        if(users && inputValues) {
          return users
          .filter(user => (
            user.name.includes(inputValues.search as string)
          ))
          .filter(user => {
            if(user && inputValues.status && inputValues.status !== 'all') {
              return user.status === +(inputValues.status)
            } else {
              return user
            }
          })
        } else {
          return users
        }
      })
    )
  }

  addNewUser() {
    const nameValue = this.filterGroup.value.addUser
    const users = this.users$.getValue()
    if(nameValue && users) {
      this.users$.next([...users, {name: nameValue, status: 1}])
      this.filterGroup.patchValue({addUser: ''})
    }
  }

}
