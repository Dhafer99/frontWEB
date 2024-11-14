import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService  {

    private tokenUrl = 'http://localhost:8080/realms/master/protocol/openid-connect/token';
  private clientId = 'gateway';
  private clientSecret = 'NPXYADY55ec8HdzK3ARU7XpKnB8SiBex';

  private token : string ;
 
  private scope = 'openid offline_access';

    constructor(private http: HttpClient) { }

    

    getToken(username: string, password: string): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
      });
  
      const body = new URLSearchParams();
      body.set('grant_type', 'password');
      body.set('username', username);
      body.set('password', password);
      body.set('scope', this.scope);
  
      return this.http.post<any>(this.tokenUrl, body.toString(), { headers }).pipe(
          tap(response => {
              this.token = response.access_token; // Store access token
              console.log('Access Token:', this.token);
          })
      );
  }

  // Method to retrieve the stored token
getTokenForService(): string | null {
  return this.token;
}
}
