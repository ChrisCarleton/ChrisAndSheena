import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app/home.component';
import { NotFoundComponent } from './app/not-found.component';

const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: '**', component: NotFoundComponent }
];

export default RouterModule.forRoot(appRoutes);
