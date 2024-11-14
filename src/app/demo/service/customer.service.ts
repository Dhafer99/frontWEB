import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../api/customer';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerService {

    
       // Assume the token is available here (you might fetch it from a service)
        token = this.authservice.getTokenForService();
        

        headers = new HttpHeaders({
           'Authorization': `Bearer ${this.token}`
       });

    constructor(private http: HttpClient,private authservice: AuthService) { }

    getCustomersSmall() {

        const token = this.authservice.getTokenForService(); // Fetch token here
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any>(`${environment.userUrl}/keycloak/users`)
            .toPromise()
            //.then(res => res.data as Customer[])
            .then(data => data)
            .then(data => {
                console.log(data); // Log the data to the console
                return data;
            });
            ;
           
    }
    getAnimals() {
        const token = this.authservice.getTokenForService(); // Fetch token here
       

        return this.http.get<any>(`${environment.animalUrl}/animal/Animal`)
            .toPromise()
            .then(data => {
                console.log(data); // Log the data to the console
                return data;
            });
    }
    getPlans() {
       
       

        return this.http.get<any>(`${environment.foodUrl}/alimentation/PlanAlimentaire`)
            .toPromise()
            .then(data => {
                console.log(data); // Log the data to the console
                return data;
            });
    }

    affecterAnimal(userid:string,animalid:string) {
        const token = this.authservice.getTokenForService(); // Fetch token here
       

        return this.http.post<any>(`${environment.userUrl}/hamma/${userid}/${animalid}`, {})
        .toPromise()
        .then(data => {
            console.log('Request successful:', data);
            return data;
        })
        .catch(error => {
            console.error('Error occurred:', error);
            throw error;
        });
    

    }

    getUserByEmail(email: string): Promise<any> {
        const token = this.authservice.getTokenForService(); // Fetch token here
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    
        return this.http.get<any>(`${environment.userUrl}/keycloak/user/email?email=${email}`, )
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

    // New method to assign a plan to an animal
    affecterPlanAnimal(idAnimal: number, idPlan: number): Observable<any> {
        return this.http.put<any>(`${environment.animalUrl}/alimentation/affecter/${idAnimal}/${idPlan}`, {});
      }
    getCustomersMedium() {
        return this.http.get<any>('assets/demo/data/customers-medium.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getCustomersLarge() {
        return this.http.get<any>('assets/demo/data/customers-large.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }
}
