import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

const apiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  authenticate(userName: string, password: string) {

    return this.http.post(

          apiUrl + '/user/login',
          { userName, password },
          { observe: 'response' }
      )
      .pipe(tap(res => {
        const authToken = <string> res.headers.get('x-access-token');
        this.userService.setToken(authToken);
      }));
  }
}
