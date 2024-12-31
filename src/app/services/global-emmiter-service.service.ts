import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalEmmiterServiceService {
  constructor() {}
  userLoggedIn: BehaviorSubject<any> = new BehaviorSubject(null);
}
