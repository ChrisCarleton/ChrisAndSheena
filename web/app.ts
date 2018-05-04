import { enableProdMode, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from "./app.component";

import router from './app.router';
import { HomeComponent } from "./app/home.component";
import { NotFoundComponent } from "./app/not-found.component";

import './style.css';

if (process.env.ENV === 'production') {
	enableProdMode();
}

@NgModule({
	imports: [
		BrowserModule,
		NgbModule.forRoot(),
		router
	],
	declarations: [
		AppComponent,
		HomeComponent,
		NotFoundComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch(err => {
		console.error(err);
	});
