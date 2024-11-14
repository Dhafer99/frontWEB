import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users2',
  templateUrl: './users2.component.html'
})
export class Users2Component {

  animals: Animal[] = [];
  selectedAnimal: Animal | null = null;  // Add this property for binding
  selectedAnimalPlans: PlanAlimentaire[] = [];

  constructor(private http: HttpClient) { 
    // Fetch and log animal data when the component initializes
    this.getAllAnimals(); // Fetch all animals initially
  }

  // Method to fetch all animals
  getAllAnimals() {
    this.http.get<Animal[]>(`${environment.animalUrl}/animal/Animal`).subscribe(
      data => this.animals = data,
      error => console.error('Error fetching animals:', error)
    );
  }

  // Method to fetch and log animal and its plans
  fetchPlansForAnimal(animalId: number) {
    this.getPlansByAnimalId(animalId).subscribe(
      plans => {
        console.log('Associated Plans:', plans);
        this.selectedAnimalPlans = plans;
      },
      error => console.error('Error fetching plans:', error)
    );
  }

  // Get a specific animal by ID
  getAnimalById(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${environment.animalUrl}/animal/Animal/${id}`);
  }

  // Get a list of PlanAlimentaire by IDs
  getPlansByAnimalId(animalId: number): Observable<PlanAlimentaire[]> {
    return this.getAnimalById(animalId).pipe(
      switchMap(animal => {
        const planRequests = animal.listPlanAlimentation.map(planId => this.getPlanById(planId));
        return forkJoin(planRequests);
      })
    );
  }

  // Get a specific PlanAlimentaire by ID
  private getPlanById(planId: number): Observable<PlanAlimentaire> {
    return this.http.get<PlanAlimentaire>(`${environment.foodUrl}/alimentation/PlanAlimentaire/${planId}`);
  }
}

export interface Animal {
  id: number;
  nom: string;
  espece: string;
  race: string;
  age: number;
  sexe: string;
  listPlanAlimentation: number[];
  dossierMedical?: DossierMedical;
}

export interface DossierMedical {
  // Define dossierMedical properties if known, or add later as needed
}

export interface PlanAlimentaire {
  id: number;
  type: string;
  jour: string;
  // Add additional fields as needed based on backend data
}
