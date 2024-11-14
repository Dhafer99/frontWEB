import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './affecteranimal.component.html',
})
export class AffecteranimalComponent implements OnInit {
  constructor(private userService: CustomerService, private http: HttpClient) {}

  users: any[] = [];
  animals: any[] = [];
  dropdownItems = [];
  dropdownItems2 = [];
  selectedUser: any = null;
  selectedAnimal: any = null;

  ngOnInit(): void {
    this.userService.getCustomersSmall().then(customers => {
      this.users = customers;
      for (const user of customers) {
        this.dropdownItems.push({
          label: user.email,
          value: user.id,  // store only the user ID
        });
      }
    });

    this.userService.getAnimals().then(animals => {
      this.animals = animals;
      for (const animal of animals) {
        this.dropdownItems2.push({
          label: animal.nom,
          value: animal.id,  // store only the animal ID
        });
      }
    });
  }

  // Function to Submit the Request
  submitRequest(): void {
    if (this.selectedUser && this.selectedAnimal) {
      const userId = this.selectedUser;
      const animalId = this.selectedAnimal;

      this.http.post<any>(`${environment.userUrl}/keycloak/affecterAnimal/${userId}/${animalId}`, {})
        .toPromise()
        .then(data => {
          console.log('Request successful:', data);
        })
        .catch(error => {
          console.error('Error occurred:', error);
        });
    } else {
      console.warn('Please select both a user and an animal.');
    }
  }
}
