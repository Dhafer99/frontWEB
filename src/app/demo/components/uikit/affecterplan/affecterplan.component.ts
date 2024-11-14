import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-animal',
  templateUrl: './affecterplan.component.html'
})
export class AffecterplanComponent implements OnInit {

  animals: any[] = [];
  plans: any[] = [];

  selectedPlanId: number | null = null;
  dropdownItems = [];
  dropdownItems2 = [];

  selectedPlan: any = null;
  selectedAnimal: any = null;

  constructor(private animalService: CustomerService, private http: HttpClient) {}

  ngOnInit(): void {
  

    
    this.animalService.getAnimals().then(animals => {
      this.animals = animals;
      for (const animal of animals) {
        this.dropdownItems.push({
          label: animal.nom,
          value: animal.id,  // store only the animal ID
        });
      }
    });


    this.animalService.getPlans().then(plans => {
      this.plans = plans;
      for (const plan of plans) {
        this.dropdownItems2.push({
          label: plan.type,
          value: plan.id,  // store only the animal ID
        });
      }
    });
  }
submitRequest(): void {
    if (this.selectedPlan && this.selectedAnimal) {
      const planid = this.selectedPlan;
      const animalId = this.selectedAnimal;

      this.http.put<any>(`${environment.animalUrl}/animal/Animal/affecter/${animalId}/${planid}`, {})
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

  




  

  