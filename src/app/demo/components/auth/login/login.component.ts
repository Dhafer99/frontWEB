import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SharedService } from 'src/app/shared.service';
import { environment } from 'src/environments/environment';
import { role } from 'src/environments/role';
import { user } from 'src/environments/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers : [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit{

    valCheck: string[] = ['remember'];
    username : string ; 
    password!: string;

    constructor(public layoutService: LayoutService,public authService:AuthService,private messageService:MessageService,public sharedService:SharedService,private http:HttpClient) { }
    ngOnInit(): void {
       
    }

    getUserByEmail(email: string): Promise<any> {
     
      
  
      return this.http.get<any>(`${environment.userUrl}/keycloak/user/email?email=${email}`,)
          .toPromise()
          .then(data => {
              console.log('User fetched by email:', data);
              return data;
          })
          .catch(error => {
              console.error('Error fetching user by email:', error);
              throw error;
          });
  }
    
    signIn(){
      
        if (this.username === user.admin && this.password === user.adminpassword) {
                    this.sharedService.setCredentials(this.username,this.password,role.adminrole);
            this.authService.getToken(this.username,this.password).subscribe(
                response => {
                  console.log('Token:', response);
                },
                error => {
    
                  console.error('Error:', error);
                }
              );
            } else if(this.username === user.username && this.password ===user.userpassword) {

              this.sharedService.setCredentials(this.username,this.password,role.userrole);
            this.authService.getToken(this.username,this.password).subscribe(
                response => {
                  console.log('Token:', response);
                },
                error => {
    
                  console.error('Error:', error);
                }
              );

            }
            
            else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username or password' });
              }

    }
}
