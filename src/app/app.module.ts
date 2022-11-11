import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from "@angular/common";
import { WheelComponent } from "./components/wheel.component/wheel.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    WheelComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
