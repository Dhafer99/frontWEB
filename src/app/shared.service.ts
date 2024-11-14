import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private username: string = '';
  private password: string = '';
  private role : string ='' ;

  setCredentials(username: string, password: string,role:string): void {
    this.username = username;
    this.password = password;
    this.role=role
  }

  getCredentials(): { username: string, password: string } {
    return { username: this.username, password: this.password };
  }
  getRole():string  {
   return this.role ;
  }
}