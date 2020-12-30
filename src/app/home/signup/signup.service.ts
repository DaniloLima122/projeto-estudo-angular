import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NewUser } from './new-user';

const API = environment.ApiUrl;

@Injectable()
export class SignupService{

  constructor(private httpClient: HttpClient){}

  checkUserNameTaken(userName: string){

    return this.httpClient.get(API + '/user/exists/' + userName);
  }

  signup(newUser: NewUser){
    return this.httpClient.post(API + '/user/signup',newUser)
  }

}
