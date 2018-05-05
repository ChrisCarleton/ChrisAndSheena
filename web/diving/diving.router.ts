import { RouterModule, Routes } from '@angular/router';
import { DivingComponent } from './diving.component';

const appRoutes: Routes = [
	{ path: 'diving', component: DivingComponent },
];

export default RouterModule.forChild(appRoutes);
