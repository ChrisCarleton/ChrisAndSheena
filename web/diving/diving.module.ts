import { NgModule } from "@angular/core";
import { DivingComponent } from "./diving.component";
import router from './diving.router';

@NgModule({
	imports: [
		router
	],
	declarations: [
		DivingComponent
	]
})
export class DivingModule {}
