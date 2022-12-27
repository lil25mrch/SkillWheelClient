import { forwardRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from "@angular/common";
import { WheelComponent } from "./components/wheel.component/wheel.component";
import { RouterModule } from "@angular/router";
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    WheelComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WheelComponent),
      multi: true
    }
  ]
})
export class AppModule { }
