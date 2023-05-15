import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  isLogged = false;
  private sidebarOpened = new BehaviorSubject<boolean>(false);
  sidebarOpened$ = this.sidebarOpened.asObservable();//observable

  openSidebar(value: boolean): void {
    this.sidebarOpened.next(value);
  }

  constructor() { }
}
