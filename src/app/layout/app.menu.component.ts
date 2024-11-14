import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { SharedService } from '../shared.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    role: string = '';

    constructor(public layoutService: LayoutService, private sharedService: SharedService) { }

    ngOnInit() {
        // Get the role from SharedService
        this.role = this.sharedService.getRole();

        // Set up the menu model based on the role
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'UI Components',
                items: [
                    { label: 'Users', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/users'] },
                    { label: 'Pet List', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/users2'] },
                    // Conditionally add either "Affecter Animal" or "Affecter Plan" based on the role
                    ...(this.role === 'admin' ? 
                        [{ label: 'Affecter Animal', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/affecter'] }] : 
                        [{ label: 'Affecter Plan', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/affecterplan'] }])
                ]
            }
        ];
    }
}
