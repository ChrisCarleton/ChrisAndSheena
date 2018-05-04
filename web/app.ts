import { enableProdMode, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from "./app.component";

if (process.env.ENV === 'production') {
	enableProdMode();
}

@NgModule({
	imports: [
		BrowserModule,
		NgbModule.forRoot()
	],
	declarations: [
		AppComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch(err => {
		console.error(err);
	});
