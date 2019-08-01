import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbTimepickerModule,NgbDate, NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from './_modal';
import { HttpClientModule, HttpClient } from '@angular/common/http';
 


@NgModule({
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,	
    ModalModule,
    HttpClientModule,
    NgbModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [NgbActiveModal, HttpClientModule, HttpClient],
  bootstrap: [AppComponent],
  entryComponents: [
  ]
})
export class AppModule { }

